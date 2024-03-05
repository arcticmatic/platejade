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

const PlatesFrames = () => {
  const BASE_URL = 'https://platejade-back.onrender.com';

  const [frames, setFrames] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [selectAllFrames, setSelectAllFrames] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/auth/all-frames?state=Florida`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        setFrames(result.frames);
        console.log(result);
      });

    setRefresh(false);
  }, [refresh]);

  const handleDelete = frameId => {
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
  };
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

  const handleSelectAllFrames = () => {
    // If selectAllPlates is true, deselect all plates
    if (selectAllFrames) {
      setSelectedItems([]);
    } else {
      // If selectAllPlates is false, select all plates
      setSelectedItems(frames.map(frame => frame._id));
    }
    // Toggle the selectAllPlates state
    setSelectAllFrames(!selectAllFrames);
  };

  const handleDeselectAllPlates = () => {
    setSelectedItems([]);
    // Deselect all plates by setting selectAllPlates to false
    setSelectAllFrames(false);
  };

  const handleActiveSubmit = () => {
    // Send selectedItems to the backend
    console.log('Selected items:', selectedItems);

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

  const handleSubmit = () => {
    // Send selectedItems to the backend
    console.log('Selected items:', selectedItems);

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

  return (
    <>
      <section className={css.dealers_section}>
        <div className={css.text_thumb}>
          <p className={css.section_text}>
            License Plates Frames
            <span className={css.dealers_amount}>({frames.length})</span>
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
                  onChange={handleSelectAllFrames}
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
                  onClick={handleSubmit}
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

          <div className={css.dealers_thumb_border}></div>
          <ul className={css.dealers_list}>
            {frames.map(frame => {
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
                  <p className={css.dealers_person}>{frame.price}</p>
                  <div className={css.plate_link_thumb}>
                    <a className={css.plate_link} href={frame.link}>
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
                        frame.status
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
                    {frame.status === 'Active' ? (
                      <img
                        className={css.edit_icon}
                        alt="pause icon"
                        width="20"
                        height="20"
                        src={pauseIcon}
                      />
                    ) : (
                      <img
                        className={css.edit_icon}
                        alt="start icon"
                        width="20"
                        height="20"
                        src={startIcon}
                      />
                    )}
                    <img
                      onClick={() => handleDelete(frame._id)}
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
