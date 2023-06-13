import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setfilterContacts, setIsLoading } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import { getContactsThunk, deleteContactsThunk } from 'redux/contacts.thunk';
import ss from './Contacts.module.css';
import { MagnifyingGlass } from 'react-loader-spinner';

export const Contacts = () => {
  const contactLoading = useSelector(setIsLoading);
  const dispatch = useDispatch();
  const handleDelete = id => dispatch(deleteContactsThunk(id));
  const filterContacts = useSelector(setfilterContacts);

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  return (
    <>
      <ul className={ss.listall}>
        {contactLoading ? (
          <div className="loader">
            <MagnifyingGlass
              className={ss.load}
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#706ef1"
            />
          </div>
        ) : (
          filterContacts.map(({ name, id, phone }) => {
            return (
              <li key={id} className={ss.list}>
                {name}: {phone}
                <button
                  key={id}
                  type="button"
                  className={ss.button_delete}
                  onClick={() => handleDelete(id)}
                >
                  delete
                </button>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      phone: PropTypes.string,
    })
  ),
};
