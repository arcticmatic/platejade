import css from './PlatesFrames.module.css';
import { useState, useEffect } from 'react';
import cross from '../icons/cross.svg';
import editIcon from '../icons/editIcon.svg';
import deleteIcon from '../icons/deleteIcon.svg';
import linkArrow from '../icons/linkArrow.svg';
import cancelCross from '../icons/cancelCross.svg';

import startIcon from '../icons/startIcon.svg';
import pauseIcon from '../icons/pauseIcon.svg';
import deleteIconWhite from '../icons/deleteIconWhite.svg';
import activateIcon from '../icons/activateIcon.svg';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import authSelectors from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';

const PlatesFrames = () => {
  const BASE_URL = 'https://platejade-back.onrender.com';

  const email = useSelector(authSelectors.getEmail);
  const role = useSelector(authSelectors.getRole);
  const dealerName = useSelector(authSelectors.getName);

  const [frames, setFrames] = useState([]);
  const [dealerFrames, setDealerFrames] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [selectAllFrames, setSelectAllFrames] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [multipleChoiceNotification, setMultipleChoiceNotification] =
    useState(false);

  const [result, setResult] = useState('');
  const [multipleChoiceResult, setMultipleChoiceResult] = useState('');

  const [password, setPassword] = useState('');
  const [frameId, setFrameId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'Admin') {
      fetch(`${BASE_URL}/api/auth/frames`, {
        method: 'GET',
        header: {},
      })
        .then(res => res.json())
        .then(result => {
          setFrames(result.frames);
        });
    }
    if (role === 'Dealer') {
      fetch(`${BASE_URL}/api/auth/dealer-frames?dealer=${dealerName}`, {
        method: 'GET',
        header: {},
      })
        .then(res => res.json())
        .then(res => {
          setDealerFrames(res.frames);
        });
    }
    setRefresh(false);
  }, [refresh, dealerName, role]);

  const handleChange = event => {
    event.preventDefault();
    const { value } = event.target;

    setPassword(value);
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

  const handleSelectAllFrames = () => {
    if (selectAllFrames) {
      setSelectedItems([]);
    } else {
      setSelectedItems(frames.map(frame => frame._id));
    }
    setSelectAllFrames(!selectAllFrames);
  };

  const handleSelectAllDealerFrames = () => {
    // If selectAllPlates is true, deselect all plates
    if (selectAllFrames) {
      setSelectedItems([]);
    } else {
      // If selectAllPlates is false, select all plates
      setSelectedItems(dealerFrames.map(frame => frame._id));
    }
    // Toggle the selectAllPlates state
    setSelectAllFrames(!selectAllFrames);
  };

  const handleDeselectAllPlates = () => {
    setSelectedItems([]);
    setSelectAllFrames(false);
  };
  const handleEditStatus = (frameId, plateStatus) => {
    const newStatus =
      plateStatus.toString() === 'Active' ? 'Not available' : 'Active';

    fetch(`${BASE_URL}/api/auth/frames/${frameId}`, {
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
    // Send selectedItems to the backend
    // console.log('Selected items:', selectedItems);

    fetch(`${BASE_URL}/api/auth/frames`, {
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
          setFrames(prevItems =>
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

  const handleRedirect = frameName => {
    // event.preventDefault();
    console.log('inside');
    navigate({
      pathname: '/edit-license-plate-frame',
      search: `?frame=${frameName}`,
    });
  };

  const handleFrameClick = id => {
    setShowNotification(true);
    setFrameId(id);
  };

  const handleMultipleFramesClick = () => {
    setMultipleChoiceNotification(true);
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
      .then(res => {
        setMultipleChoiceResult(res.status);
        if (res.status === 'success') {
          fetch(`${BASE_URL}/api/auth/frames`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: selectedItems }),
          })
            .then(response =>
              response.json(
                setFrames(prevItems =>
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
              console.error(
                'Error sending data to other backend route:',
                error
              );
            });

          setRefresh(true);
          setPassword('');
          setMultipleChoiceNotification(false);
        } else {
          setPassword('');
        }
      });
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
      .then(res => {
        setResult(res.status);
        if (res.status === 'success') {
          fetch(`${BASE_URL}/api/auth/frames/${frameId}`, {
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
      });
  };

  const handleOnCancelClick = () => {
    setResult('');
    setMultipleChoiceResult('');
    setShowNotification(false);
    setMultipleChoiceNotification(false);
    setSelectedItems([]);
  };

  return (
    <>
      <section className={css.dealers_section}>
        <div className={css.text_thumb}>
          <p className={css.section_text}>
            License Plates Frames
            <span className={css.dealers_amount}>
              ({role === 'Admin' ? frames.length : dealerFrames.length})
            </span>
          </p>
          <NavLink to="/add-plate-frame">
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
                  checked={selectAllFrames}
                  onChange={
                    role === 'Admin'
                      ? handleSelectAllFrames
                      : handleSelectAllDealerFrames
                  }
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
                  onClick={handleMultipleFramesClick}
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
                Please, confirm the deletion of the frame by entering your
                password below:
              </p>
              {
                <p
                  className={
                    result && result !== 'success'
                      ? css.notification_wrong_password_text
                      : css.notification_wrong_password_hidden
                  }
                >
                  Password is wrong!
                </p>
              }

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

          {multipleChoiceNotification && (
            <div className={css.notification_modal}>
              <p className={css.notification_message}>
                Please, confirm the deletion of the frame by entering your
                password below:
              </p>

              {
                <p
                  className={
                    multipleChoiceResult && multipleChoiceResult !== 'success'
                      ? css.notification_wrong_password_text
                      : css.notification_wrong_password_hidden
                  }
                >
                  Password is wrong!
                </p>
              }

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
            {role === 'Admin'
              ? frames.map(frame => {
                  return (
                    <li className={css.dealers_list_item} key={frame._id}>
                      <div className={css.dealer_info_thumb}>
                        <input
                          className={css.item_checkbox}
                          type="checkbox"
                          value={frame._id}
                          checked={selectedItems.includes(frame._id)}
                          onChange={handleCheckboxChange}
                        />
                        <img
                          width="80"
                          height="40"
                          alt="plate logo"
                          src={frame.image}
                          className={css.plateIcon}
                        />
                      </div>
                      <p className={css.dealers_company_name}>{frame.name}</p>
                      <p className={css.dealers_person}>${frame.amazonPrice}</p>
                      <div className={css.plate_link_thumb}>
                        <a className={css.plate_link} href={frame.amazonLink || frame.secondShopLink} target="_blank" rel="noopener noreferrer">
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
                            frame.status.toString() === 'Active'
                              ? css.dealers_status_btn_active
                              : css.dealers_status_btn
                          }
                        >
                          {frame.status ? frame.status : 'Not available'}
                        </button>
                      </p>
                      <div className={css.dealers_admin_actions_thumb}>
                        <img
                          onClick={() => handleRedirect(frame.name)}
                          className={css.edit_icon}
                          alt="edit icon"
                          width="20"
                          height="20"
                          src={editIcon}
                        />
                        {frame.status.toString() === 'Active' ? (
                          <img
                            onClick={() =>
                              handleEditStatus(frame._id, frame.status)
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
                              handleEditStatus(frame._id, frame.status)
                            }
                            className={css.edit_icon}
                            alt="start icon"
                            width="20"
                            height="20"
                            src={startIcon}
                          />
                        )}

                        <img
                          onClick={() => handleFrameClick(frame._id)}
                          className={css.delete_icon}
                          alt="delete icon"
                          width="20"
                          height="20"
                          src={deleteIcon}
                        />
                      </div>
                    </li>
                  );
                })
              : dealerFrames.map(frame => {
                  return (
                    <li className={css.dealers_list_item} key={frame._id}>
                      <div className={css.dealer_info_thumb}>
                        <input
                          className={css.item_checkbox}
                          type="checkbox"
                          value={frame._id}
                          checked={selectedItems.includes(frame._id)}
                          onChange={handleCheckboxChange}
                        />
                        <img
                          width="80"
                          height="40"
                          alt="plate logo"
                          src={frame.image}
                          className={css.plateIcon}
                        />
                      </div>
                      <p className={css.dealers_company_name}>{frame.name}</p>
                      <p className={css.dealers_person}>${frame.amazonPrice}</p>
                      <div className={css.plate_link_thumb}>
                        <a className={css.plate_link} href={frame.amazonLink || frame.secondShopLink} target="_blank" rel="noopener noreferrer">
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
                            frame.status.toString() === 'Active'
                              ? css.dealers_status_btn_active
                              : css.dealers_status_btn
                          }
                        >
                          {frame.status ? frame.status : 'Not available'}
                        </button>
                      </p>
                      <div className={css.dealers_admin_actions_thumb}>
                        <img
                          onClick={() => handleRedirect(frame.name)}
                          className={css.edit_icon}
                          alt="edit icon"
                          width="20"
                          height="20"
                          src={editIcon}
                        />
                        {frame.status.toString() === 'Active' ? (
                          <img
                            onClick={() =>
                              handleEditStatus(frame._id, frame.status)
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
                              handleEditStatus(frame._id, frame.status)
                            }
                            className={css.edit_icon}
                            alt="start icon"
                            width="20"
                            height="20"
                            src={startIcon}
                          />
                        )}

                        <img
                          onClick={() => handleFrameClick(frame._id)}
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
export default PlatesFrames;
