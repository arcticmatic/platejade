import css from './Users.module.css';
import { useState, useEffect } from 'react';
import authSelectors from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import openMenuIcon from '../icons/openMenuIcon.svg';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const role = useSelector(authSelectors.getRole);

  const BASE_URL = 'https://platejade-back.onrender.com';

  useEffect(() => {
    fetch(`${BASE_URL}/api/auth/admin/allusers`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        setUsers(result.users);
      });
  }, []);

  const onOpenMenu = index => {
    setOpenMenuIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <>
      {role === 'Admin' && (
        <section className={css.users_section}>
          <div className={css.text_thumb}>
            <p className={css.section_text}>
              Users
              <span className={css.dealers_amount}>({users.length})</span>
            </p>
          </div>
          <div className={css.dealers_thumb}>
            {/* <input
              className={css.item_checkbox}
              type="checkbox"
              // checked={selectAllUsers}
              // onChange={
              //   role === 'Admin'
              //     ? handleSelectAllPlates
              //     : handleSelectAllDealerPlates
              // }
            /> */}
            <div className={css.dealers_thumb_titles}>
              <p className={css.dealers_company_title_name}>Name</p>

              <p className={css.dealers_company_title}>E-mail</p>
              <p className={css.dealers_company_title}>Phone</p>

              <p className={css.user_address}>Address</p>

              <p className={css.dealers_action}>Action</p>
            </div>
            <div className={css.dealers_thumb_border_top}></div>
            <div className={css.dealers_thumb_border}></div>

            <ul className={css.dealers_list}>
              {users.map((user, index) => {
                return (
                  <li className={css.dealers_list_item} key={user._id}>
                    <div className={css.users_list_thumb}>
                      <div className={css.dealer_info_thumb}>
                        <p className={css.dealers_company_name}>
                          {user.firstName} {user.secondName}
                        </p>
                      </div>
                      <p className={css.dealers_person}>{user.email}</p>
                      <p className={css.dealers_number}>{user.phone}</p>
                      <p className={css.dealers_email}>{user.firstAddress}</p>
                      <div className={css.actions_thumb}>
                        <img
                          className={
                            openMenuIndex === index
                              ? css.dropdown_arrow
                              : css.dropdown_arrow_close
                          }
                          src={openMenuIcon}
                          alt="Dropdown Arrow"
                          onClick={() => onOpenMenu(index)}
                        />
                      </div>
                    </div>

                    {openMenuIndex === index && (
                      <>
                        <div className={css.dealers_thumb_border}></div>

                        <div className={css.user_details_menu_thumb}>
                          <div className={css.user_details_list}>
                            <ul className={css.details_list}>
                              <li className={css.user_details_item}>
                                <p className={css.user_details_item_name}>
                                  FirstName
                                </p>
                                <p className={css.user_details}>
                                  {user.firstName}
                                </p>
                              </li>
                              <li className={css.user_details_item}>
                                <p className={css.user_details_item_name}>
                                  Last Name
                                </p>
                                <p className={css.user_details}>
                                  {user.lastName}
                                </p>
                              </li>
                              <li className={css.user_details_item}>
                                <p className={css.user_details_item_name}>
                                  E-mail
                                </p>
                                <p className={css.user_details}>{user.email}</p>
                              </li>
                              <li className={css.user_details_item}>
                                <p className={css.user_details_item_name}>
                                  Phone
                                </p>
                                <p className={css.user_details}>{user.phone}</p>
                              </li>
                            </ul>
                            <ul className={css.details_list}>
                              <li className={css.user_details_item}>
                                <p className={css.user_details_item_name}>
                                  Address 1
                                </p>
                                <p className={css.user_details}>
                                  {user.firstAddress}
                                </p>
                              </li>
                              <li className={css.user_details_item}>
                                <p className={css.user_details_item_name}>
                                  Address 2
                                </p>
                                <p className={css.user_details}>
                                  {user.secondAddress}
                                </p>
                              </li>
                              <li className={css.user_details_item}>
                                <p className={css.user_details_item_name}>
                                  City
                                </p>
                                <p className={css.user_details}>{user.city}</p>
                              </li>
                              <li className={css.user_details_item}>
                                <p className={css.user_details_item_name}>
                                  State
                                </p>
                                <p className={css.user_details}>{user.state}</p>
                              </li>
                              <li className={css.user_details_item}>
                                <p className={css.user_details_item_name}>
                                  Zipcode
                                </p>
                                <p className={css.user_details}>
                                  {user.zipCode}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                    <div className={css.dealers_thumb_border}></div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};
export default Users;
