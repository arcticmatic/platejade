import css from './LicensePlates.module.css';
import { useState, useEffect } from 'react';
import cross from '../icons/cross.svg';
import cancelCross from '../icons/cancelCross.svg';
import editIcon from '../icons/editIcon.svg';
import deleteIcon from '../icons/deleteIcon.svg';
import linkArrow from '../icons/linkArrow.svg';
import startIcon from '../icons/startIcon.svg';
import pauseIcon from '../icons/pauseIcon.svg';
import deleteIconWhite from '../icons/deleteIconWhite.svg';
import activateIcon from '../icons/activateIcon.svg';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import authSelectors from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';

const LicensePlates = () => {
  const email = useSelector(authSelectors.getEmail);

  const [plates, setPlates] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [selectAllPlates, setSelectAllPlates] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [result, setResult] = useState('');
  const [multipleChoiceResult, setMultipleChoiceResult] = useState('');

  const [password, setPassword] = useState('');
  const [plateId, setPlateId] = useState('');

  const BASE_URL = 'https://platejade-back.onrender.com';

  const getAllPlates = () => {
    fetch(`${BASE_URL}/api/auth/plates`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        setPlates(result.plates);
      });
  };

  useEffect(() => {
    getAllPlates();
    setRefresh(false);
  }, [refresh]);

  // Function to handle checkbox selection
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

  const handleChange = event => {
    event.preventDefault();
    const { value } = event.target;

    setPassword(value);
  };

  const handlePlateClick = id => {
    setShowNotification(true);
    setPlateId(id);
  };

  // const handleDelete = plateId => {
  //   fetch(`${BASE_URL}/api/auth/plates/${plateId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log('refresh');
  //     });
  //   setRefresh(true);
  // };

  const handleEditStatus = (plateId, plateStatus) => {
    const newStatus = plateStatus === 'Active' ? 'Not available' : 'Active';

    fetch(`${BASE_URL}/api/auth/plates/${plateId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then(res => res.json())
      .then(result => {
        setRefresh(true);
      });
  };

  const handleActiveSubmit = () => {
    fetch(`${BASE_URL}/api/auth/plates`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: selectedItems,
        field: 'status',
        value: 'Active',
      }),
    })
      .then(response =>
        response.json(
          setPlates(prevItems =>
            prevItems.filter(item => !selectedItems.includes(item))
          ),
          setSelectedItems([]),
          setRefresh(true)
        )
      )
      .then(data => {
        console.log('Response from other backend route');
      })
      .catch(error => {
        console.error('Error sending data to other backend route:', error);
      });
  };

  const handleSelectAllPlates = () => {
    // If selectAllPlates is true, deselect all plates
    if (selectAllPlates) {
      setSelectedItems([]);
    } else {
      // If selectAllPlates is false, select all plates
      setSelectedItems(plates.map(plate => plate._id));
    }
    // Toggle the selectAllPlates state
    setSelectAllPlates(!selectAllPlates);
  };

  const handleDeselectAllPlates = () => {
    setSelectedItems([]);
    // Deselect all plates by setting selectAllPlates to false
    setSelectAllPlates(false);
  };

  const handleRedirect = plateName => {
    // event.preventDefault();
    console.log('inside');
    navigate({
      pathname: '/edit-license-plate',
      search: `?plate=${plateName}`,
    });
  };

  const handleMultiplePlatesClick = () => {
    setShowNotification(true);
  };

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

    console.log('plate id:', plateId);

    if (result === 'success') {
      fetch(`${BASE_URL}/api/auth/plates/${plateId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(result => {
          console.log('refresh');
        });
      setRefresh(true);

      setShowNotification(false);
    } else {
      setPassword('');
    }
  };
  const handleMultipleItemsPasswordCheck = () => {
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
      .then(res => setMultipleChoiceResult(res.status));

    if (result === 'success') {
      fetch(`${BASE_URL}/api/auth/plates`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedItems }),
      })
        .then(response =>
          response.json(
            setPlates(prevItems =>
              prevItems.filter(item => !selectedItems.includes(item))
            ),
            setSelectedItems([]),
            setRefresh(true)
          )
        )
        .then(data => {
          console.log('Response from other backend route');
        })
        .catch(error => {
          console.error('Error sending data to other backend route:', error);
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
            License Plates
            <span className={css.dealers_amount}>({plates.length})</span>
          </p>
          <NavLink to="/add-license-plate">
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
                  checked={selectAllPlates}
                  onChange={handleSelectAllPlates}
                />
                <p className={css.dealers_company_title}>View</p>
              </div>

              <p className={css.dealers_company_title}>Name</p>

              <p className={css.dealers_company_title}>Price</p>
              <p className={css.dealers_company_title}>Link</p>
              <p className={css.dealers_action}>Status</p>
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
                onClick={handleDeselectAllPlates}
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
                  onClick={handleMultiplePlatesClick}
                />
                <p className={css.plates_chosen_text}>Delete All</p>
              </div>
              <div className={css.plate_text_icons_thumb}>
                <img
                  width="20"
                  height="20"
                  alt="plate logo"
                  src={activateIcon}
                  className={css.activate_icon}
                  onClick={handleActiveSubmit}
                />
                <p className={css.plates_chosen_text}>Activate All</p>
              </div>
            </div>
          )}

          {showNotification && (
            <div className={css.notification_modal}>
              <p className={css.notification_message}>
                Please, confirm the deletion of the plate by entering your
                password below:
              </p>
              {result && result !== 'success' ? (
                <p className={css.notification_wrong_password_text}>
                  Password is wrong!
                </p>
              ) : (
                ''
              )}

              <input
                className={css.notification_input}
                name="password"
                value={password}
                placeholder="Enter the password"
                type="text"
                onChange={handleChange}
              />
              <div className={css.notification_buttons_thumb}>
                <button
                  className={css.notification_button_confirm}
                  onClick={() => handlePasswordCheck()}
                >
                  Confirm
                </button>
                <button
                  className={css.notification_button_cancel}
                  onClick={() => handleOnCancelClick()}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {showNotification && (
            <div className={css.notification_modal}>
              <p className={css.notification_message}>
                Please, confirm the deletion of the plates by entering your
                password below:
              </p>
              {multipleChoiceResult && multipleChoiceResult !== 'success' ? (
                <p className={css.notification_wrong_password_text}>
                  Password is wrong!
                </p>
              ) : (
                ''
              )}

              <input
                className={css.notification_input}
                name="password"
                value={password}
                placeholder="Enter the password"
                type="text"
                onChange={handleChange}
              />
              <div className={css.notification_buttons_thumb}>
                <button
                  className={css.notification_button_confirm}
                  onClick={() => handleMultipleItemsPasswordCheck()}
                >
                  Confirm
                </button>
                <button
                  className={css.notification_button_cancel}
                  onClick={() => handleOnCancelClick()}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className={css.dealers_thumb_border}></div>
          <ul className={css.dealers_list}>
            {plates.map(plate => {
              return (
                <li className={css.dealers_list_item} key={plate._id}>
                  <div className={css.dealer_info_thumb}>
                    <input
                      className={css.item_checkbox}
                      type="checkbox"
                      value={plate._id}
                      checked={selectedItems.includes(plate._id)}
                      onChange={handleCheckboxChange}
                    />
                    <img
                      width="80"
                      height="40"
                      alt="plate logo"
                      src={plate.image}
                      className={css.plateIcon}
                    />
                  </div>
                  <p className={css.dealers_company_name}>{plate.name}</p>
                  <p className={css.dealers_person}>${plate.price}</p>
                  <div className={css.plate_link_thumb}>
                    <a className={css.plate_link} href={plate.link}>
                      <p className={css.dealers_number}>
                        <img
                          width="14"
                          height="14"
                          alt="plate logo"
                          src={linkArrow}
                          className={css.plateIcon}
                        />
                        View link
                      </p>
                    </a>
                  </div>
                  <p className={css.dealers_status}>
                    <button
                      className={
                        plate.status === 'Active'
                          ? css.dealers_status_btn_active
                          : css.dealers_status_btn
                      }
                    >
                      {plate.status ? plate.status : 'Not available'}
                    </button>
                  </p>
                  <div className={css.dealers_admin_actions_thumb}>
                    <img
                      onClick={() => handleRedirect(plate.name)}
                      className={css.edit_icon}
                      alt="edit icon"
                      width="20"
                      height="20"
                      src={editIcon}
                    />
                    {plate.status === 'Active' ? (
                      <img
                        onClick={() =>
                          handleEditStatus(plate._id, plate.status)
                        }
                        className={css.edit_icon}
                        alt="pause icon"
                        width="20"
                        height="20"
                        src={pauseIcon}
                      />
                    ) : (
                      <img
                        onClick={() =>
                          handleEditStatus(plate._id, plate.status)
                        }
                        className={css.edit_icon}
                        alt="start icon"
                        width="20"
                        height="20"
                        src={startIcon}
                      />
                    )}
                    <img
                      onClick={() => handlePlateClick(plate._id)}
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
export default LicensePlates;
