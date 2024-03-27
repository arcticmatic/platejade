import css from './DealersPage.module.css';
import cross from '../icons/cross.svg';
import AZFilterIcon from '../icons/AZFilterIcon.svg';
import editIcon from '../icons/editIcon.svg';
import deleteIcon from '../icons/deleteIcon.svg';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import authSelectors from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import cancelCross from '../icons/cancelCross.svg';
import deleteIconWhite from '../icons/deleteIconWhite.svg';

const DealersPage = () => {
  const [dealers, setDealers] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [result, setResult] = useState('');
  const [selectAllDealers, setSelectAllDealers] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [multipleChoiceResult, setMultipleChoiceResult] = useState('');

  const [password, setPassword] = useState('');
  const [dealerId, setDealerId] = useState('');

  const BASE_URL = 'https://platejade-back.onrender.com';

  const email = useSelector(authSelectors.getEmail);

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

  const handleDealerClick = id => {
    setShowNotification(true);
    setDealerId(id);
  };

  const handleCheckboxChange = event => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedItems(prevSelectedItems => [...prevSelectedItems, value]);
    } else {
      setSelectedItems(prevSelectedItems =>
        prevSelectedItems.filter(item => item !== value)
      );
    }
  };

  const handleSelectAllDealers = () => {
    if (selectAllDealers) {
      setSelectedItems([]);
    } else {
      setSelectedItems(dealers.map(dealer => dealer._id));
    }
    setSelectAllDealers(!selectAllDealers);
  };

  const handleDeselectAllDealers = () => {
    setSelectedItems([]);
    setSelectAllDealers(false);
  };

  // const handleDelete = dealerId => {
  //   fetch(`${BASE_URL} /api/auth/admin/delete-dealer/${dealerId}`, {
  //     method: 'DELETE',
  //     headers: {},
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       // console.log('refresh');
  //       setDealers(result.dealers);
  //       // console.log('result.dealers', result.dealers);
  //     });
  //   setRefresh(true);
  // };

  const handleChange = event => {
    event.preventDefault();
    const { value } = event.target;

    setPassword(value);
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

  const handlePasswordCheck = () => {
    fetch(`${BASE_URL}/api/auth/admin/check-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(res => setResult(res.status));

    if (result === 'success') {
      fetch(`${BASE_URL}/api/auth/delete-dealer/${dealerId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(result => {
          setDealers(result.dealers);
        });
      setRefresh(true);

      setShowNotification(false);
    } else {
      setPassword('');
    }
  };

  const handleOnCancelClick = () => {
    setResult('');
    setMultipleChoiceResult('');
    setShowNotification(false);
  };

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
          {selectedItems.length === 0 ? (
            <div className={css.dealers_thumb_titles}>
              <div className={css.dealers_companies_thumb}>
                <input
                  className={css.item_checkbox}
                  type="checkbox"
                  checked={selectAllDealers}
                  onChange={handleSelectAllDealers}
                />
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
              <p className={css.dealers_company_email}>E-mail</p>
              <p className={css.dealers_action}>Action</p>
            </div>
          ) : (
            <div className={css.plates_thumb_chosen}>
              <img
                width="20"
                height="20"
                alt="plate logo"
                src={cancelCross}
                className={css.cancel_icon}
                onClick={handleDeselectAllDealers}
              />
              <p className={css.plates_chosen_text}>
                Selected: {selectedItems.length}
              </p>
              <span className={css.white_border}></span>
              <div className={css.plate_text_icons_thumb}>
                <img
                  width="20"
                  height="20"
                  alt="delete"
                  src={deleteIconWhite}
                  className={css.delete_icon}
                  // onClick={handleMultipleFramesClick}
                />
                <p className={css.plates_chosen_text}>Delete All</p>
              </div>
            </div>
          )}

          <div className={css.dealers_thumb_border}></div>
          <ul className={css.dealers_list}>
            {dealers.map(dealer => {
              return (
                <li className={css.dealers_list_item} key={dealer._id}>
                  <div className={css.dealer_info_thumb}>
                    <div className={css.dealer_info_thumb}>
                      <input
                        className={css.item_checkbox}
                        type="checkbox"
                        value={dealer._id}
                        checked={selectedItems.includes(dealer._id)}
                        onChange={handleCheckboxChange}
                      />
                      <img
                        alt="dealer logo"
                        src={dealer.logo}
                        className={css.dealerIcon}
                      />
                      <p className={css.dealers_company_name}>
                        {dealer.company_name}
                      </p>
                    </div>
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
                      onClick={() => handleDealerClick(dealer._id)}
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
