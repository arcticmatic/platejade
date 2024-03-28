import css from './Users.module.css';
import { useState, useEffect } from 'react';
import authSelectors from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';

const Users = () => {
  const [users, setUsers] = useState([]);
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
            <div className={css.dealers_thumb_titles}>
              <div className={css.dealers_thumb_titles}>
                <p className={css.dealers_company_title}>Name</p>
              </div>

              <p className={css.dealers_company_title}>E-mail</p>
              <p className={css.dealers_company_title}>Phone</p>

              <p className={css.dealers_action}>Address</p>
            </div>
            <div className={css.dealers_thumb_border}></div>
            <ul className={css.dealers_list}>
              {users.map(user => {
                return (
                  <li className={css.dealers_list_item} key={user._id}>
                    <div className={css.dealer_info_thumb}>
                      <p className={css.dealers_company_name}>{user.name}</p>
                    </div>

                    <p className={css.dealers_person}>{user.email}</p>
                    <p className={css.dealers_number}>{user.phone}</p>
                    <p className={css.dealers_email}>{user.address}</p>
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
