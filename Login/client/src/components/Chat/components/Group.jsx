import React, { useState, useEffect } from 'react';
import { BsPlusLg } from "react-icons/bs";
import { Modal, Box } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { createGroup } from '../apis/chat'; // Assuming this API call is independent of auth.js
import { fetchChats } from '../redux/chatsSlice';
import { useDispatch } from 'react-redux';
import Search from './group/Search';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
};

function Group() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [searchResults, setSearchResults] = useState([]); // State related to search results will be unused
  const [search, setSearch] = useState(""); // State related to search input will be unused
  const [isLoading, setIsLoading] = useState(false); // Loading state related to search will be unused
  const [selectedUser, setSelectedUsers] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearch("");
    setSelectedUsers([]);
  };

  const handleFormSearch = async (e) => {
    setSearch(e.target.value); // This function will be removed since search is not supported
  };

  const handleClick = (e) => {
    if (selectedUser.includes(e)) {
      return;
    }
    setSelectedUsers([...selectedUser, e]);
  };

  const deleteSelected = (ele) => {
    setSelectedUsers(selectedUser.filter((e) => e._id !== ele._id));
  };

  const handleSubmit = async () => {
    if (selectedUser.length >= 2) {
      await createGroup({
        chatName,
        users: JSON.stringify(selectedUser.map((e) => e._id))
      });
      dispatch(fetchChats());
      handleClose();
    }
  };

  useEffect(() => {
    // Removed the search change effect since searchUsers function is removed
  }, [search]);

  useEffect(() => {
    // Removed any additional effects related to auth or user management
  }, []);

  return (
    <>
      <button className='mt-1 transition duration-150 ease-in-out' onClick={handleOpen}>
        <div className='flex justify-start border-r-2'>
          <button className='text-[11px] font-normal tracking-wide flex items-center gap-x-1 bg-[#f6f6f6] text-[#1f2228] py-1 -mb-7 mt-2 px-2'>New Group <BsPlusLg /></button>
        </div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h5 className='text-[18px] text-[#111b21] font-medium text-center'>Create A Group</h5>
          <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-y-3 mt-3'>
            <input onChange={(e) => setChatName(e.target.value)} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="chatName" placeholder="Group Name" required />
            <div className='flex -mt-2'>
              {selectedUser?.map((e) => (
                <button key={e} onClick={() => deleteSelected(e)} className='flex items-center gap-x-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400'>
                  <span >{e.name}</span>
                  <RxCross2 />
                </button>
              ))}
            </div>
            <Search isLoading={isLoading} handleClick={handleClick} search={search} searchResults={searchResults} />
            <div className='flex justify-end mt-3'>
              <button onClick={handleSubmit} className='bg-[#0086ea] text-[#fff] text-[15px] font-medium px-2 py-1 tracking-wide' type='submit'>Create</button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Group;
