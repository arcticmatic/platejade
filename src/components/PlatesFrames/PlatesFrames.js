import css from './PlatesFrames.module.css';
import { useState, useEffect } from 'react';
import cross from '../icons/cross.svg';
import editIcon from '../icons/editIcon.svg';
import deleteIcon from '../icons/deleteIcon.svg';
import linkArrow from '../icons/linkArrow.svg';
import startIcon from '../icons/startIcon.svg';
import pauseIcon from '../icons/pauseIcon.svg';
import { NavLink } from 'react-router-dom';

const PlatesFrames = () => {
  const [frames, setFrames] = useState([]);
  const BASE_URL = 'https://platejade-back.onrender.com';

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
  }, []);

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
          <div className={css.dealers_thumb_titles}>
            <div className={css.dealers_companies_thumb}>
              <div className={css.checkbox}></div>

              <p className={css.dealers_company_title}>View</p>
            </div>

            <p className={css.dealers_company_title}>Name</p>

            <p className={css.dealers_company_title}>Price</p>
            <p className={css.dealers_company_title}>Link</p>
            <p className={css.dealers_action}>Status</p>
            <p className={css.dealers_action}>Action</p>
          </div>
          <div className={css.dealers_thumb_border}></div>
          <ul className={css.dealers_list}>
            {frames.map(frame => {
              return (
                <li className={css.dealers_list_item} key={frame._id}>
                  <div className={css.dealer_info_thumb}>
                    <div className={css.checkbox}></div>
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
