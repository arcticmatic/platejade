import css from './DealersPage.module.css';
import cross from '../icons/cross.svg';
import AZFilterIcon from '../icons/AZFilterIcon.svg';
import editIcon from '../icons/editIcon.svg';
import deleteIcon from '../icons/deleteIcon.svg';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DealersPage = () => {
  const [dealers, setDealers] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();

  const BASE_URL = 'https://platejade-back.onrender.com';

  const getAllDealers = () => {
    fetch(`${BASE_URL}/api/auth/admin/alldealers`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        setDealers(result.dealers);
      });
  };

  const handleDelete = dealerId => {
    fetch(`${BASE_URL} /api/auth/admin/delete-dealer/${dealerId}`, {
      method: 'DELETE',
      headers: {},
    })
      .then(res => res.json())
      .then(result => {
        console.log('refresh');
        // setDealers(result.dealers);
        // console.log('result.dealers', result.dealers);
      });
    setRefresh(true);
  };

  const handleRedirect = companyName => {
    // event.preventDefault();

    navigate({
      pathname: '/edit-dealer/',
      search: `?dealer=${companyName}`,
    });
  };

  useEffect(() => {
    getAllDealers();
    setRefresh(false);
  }, [refresh]);

  return (
    <>
      <section className={css.dealers_section}>
        <div className={css.text_thumb}>
          <p className={css.section_text}>
            Dealers
            <span className={css.dealers_amount}>({dealers.length})</span>
          </p>
          <NavLink to="/add-dealer">
            <button className={css.add_dealer_btn}>
              <img alt="cross" className={css.cross_icon} src={cross} />
              Add new
            </button>
          </NavLink>
        </div>
        <div className={css.dealers_thumb}>
          <div className={css.dealers_thumb_titles}>
            <div className={css.dealers_companies_thumb}>
              <div className={css.checkbox}></div>

              <p className={css.dealers_company_title}>
                <img
                  alt="companies"
                  className={css.az_filter_icon}
                  src={AZFilterIcon}
                />
                Company
              </p>
            </div>
            <p className={css.dealers_company_title}>Сontact person</p>
            <p className={css.dealers_company_title}>Number</p>
            <p className={css.dealers_company_title}>E-mail</p>
            <p className={css.dealers_action}>Action</p>
          </div>
          <div className={css.dealers_thumb_border}></div>
          <ul className={css.dealers_list}>
            {dealers.map(dealer => {
              return (
                <li className={css.dealers_list_item} key={dealer._id}>
                  <div className={css.dealer_info_thumb}>
                    <div className={css.checkbox}></div>
                    <img
                      alt="dealer logo"
                      src={dealer.logo}
                      className={css.dealerIcon}
                    />
                    <p className={css.dealers_company_name}>
                      {dealer.company_name}
                    </p>
                  </div>

                  <p className={css.dealers_person}>{dealer.contact_person}</p>
                  <p className={css.dealers_number}>{dealer.number}</p>
                  <p className={css.dealers_email}>{dealer.email}</p>

                  <div className={css.dealers_admin_actions_thumb}>
                    <p className={css.dealers_company_title}>View info</p>
                    {/* <Link to={`/edit-dealer/${dealer.company_name}`}> */}
                    <img
                      onClick={() => handleRedirect(dealer.company_name)}
                      className={css.edit_icon}
                      alt="edit icon"
                      width="20"
                      height="20"
                      src={editIcon}
                    />
                    {/* </Link> */}
                    <img
                      onClick={() => handleDelete(dealer._id)}
                      className={css.delete_icon}
                      alt="delete icon"
                      width="20"
                      height="20"
                      src={deleteIcon}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
export default DealersPage;
