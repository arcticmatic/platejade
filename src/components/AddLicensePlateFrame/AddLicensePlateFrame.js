import css from './AddLicensePlateFrame.module.css';
import { Link } from 'react-router-dom';
import backArrow from '../icons/backArrow.svg';
import dealerPhoto from '../icons/dealerPhoto.svg';
import bottomArrow from '../icons/bottomArrow.svg';
import openMenuIcon from '../icons/openMenuIcon.svg';
import { useState, useEffect } from 'react';

const AddLicensePlateFrame = () => {
  const [materials, setMaterials] = useState([]);
  const [types, setTypes] = useState([]);
  const [finishTypes, setFinishTypes] = useState([]);
  const [themes, setThemes] = useState([]);
  const [attachmentTypes, setAttachmentTypes] = useState([]);
  const [features, setFeatures] = useState([]);
  const [colorsHex, setColorsHex] = useState([]);
  const [colorsName, setColorsName] = useState([]);
  const [states, setStates] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [uploadedImage, setUploadedImage] = useState('');

  const BASE_URL = 'https://platejade-back.onrender.com';

  const [file, setFile] = useState(null);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    // RECEIVE AND SET DEALERS
    fetch(`${BASE_URL}/api/auth/admin/alldealers`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const dealersArray = Array.from(
          new Set(result.dealers.map(item => item.company_name))
        );
        setDealers(dealersArray);

        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'dealer') {
              return { ...field, options: dealersArray };
            }
            return field;
          });
          return updatedFields;
        });
      });
    // RECEIVE AND SET MATERIALS
    fetch(`${BASE_URL}/api/auth/materials`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const materialsArray = Array.from(
          new Set(result.materials.map(item => item.material))
        );
        setMaterials(materialsArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'material') {
              return { ...field, options: materialsArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET TYPES
    fetch(`${BASE_URL}/api/auth/types`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const typesArray = Array.from(
          new Set(result.types.map(item => item.type))
        );
        setTypes(typesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'type') {
              return { ...field, options: typesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET FINISH TYPES
    fetch(`${BASE_URL}/api/auth/finish-types`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const finishTypesArray = Array.from(
          new Set(result.finishTypes.map(item => item.finishType))
        );
        setFinishTypes(finishTypesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'finishType') {
              return { ...field, options: finishTypesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET ATTACHMENT THEMES
    fetch(`${BASE_URL}/api/auth/themes`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const themesArray = Array.from(
          new Set(result.themes.map(item => item.theme))
        );
        setThemes(themesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'theme') {
              return { ...field, options: themesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET ATTACHMENT TYPES
    fetch(`${BASE_URL}/api/auth/attachment-types`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const attachmentTypesArray = Array.from(
          new Set(result.attachmentTypes.map(item => item.attachmentType))
        );
        setAttachmentTypes(attachmentTypesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'attachmentType') {
              return { ...field, options: attachmentTypesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET ADDITIONAL FEATURES
    fetch(`${BASE_URL}/api/auth/features`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const featuresArray = Array.from(
          new Set(result.features.map(item => item.feature))
        );

        setFeatures(featuresArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'feature') {
              return { ...field, options: featuresArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET NAMES AND HEX COLORS
    fetch(`${BASE_URL}/api/auth/colors`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const colorNamesArray = Array.from(
          new Set(result.colors.map(item => item.colorName))
        );
        const colorHexArray = Array.from(
          new Set(result.colors.map(item => item.color))
        );
        setColorsHex(colorHexArray.flat());
        setColorsName(colorNamesArray);

        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'colorName') {
              return { ...field, options: colorNamesArray };
            }
            if (field.name === 'colorHex') {
              return { ...field, options: colorHexArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET STATES
    fetch(`${BASE_URL}/api/auth/states`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const statesArray = Array.from(
          new Set(result.states.map(item => item.state))
        );
        setStates(statesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'state') {
              return { ...field, options: statesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });
  }, []);

  const materialsArray = Array.from(
    new Set(materials.map(item => item.material))
  );

  const typesArray = Array.from(new Set(types.map(item => item.type)));

  const finishTypesArray = Array.from(
    new Set(finishTypes.map(item => item.finishType))
  );

  const attachmentTypesArray = Array.from(
    new Set(attachmentTypes.map(item => item.attachmentType))
  );

  const featuresArray = Array.from(new Set(features.map(item => item.feature)));

  const colorNamesArray = Array.from(
    new Set(colorsName.map(item => item.colorName))
  );

  const colorHexArray = Array.from(new Set(colorsHex.map(item => item.color)));

  const themesArray = Array.from(new Set(themes.map(item => item.theme)));

  const statesArray = Array.from(new Set(states.map(item => item.state)));

  const dealersArray = Array.from(new Set(dealers.map(item => item.dealers)));

  const initialFields = [
    {
      name: 'material',
      value: '',
      options: materialsArray,
      showDropdown: false,
    },
    {
      name: 'theme',
      value: '',
      options: themesArray,
      showDropdown: false,
    },
    {
      name: 'type',
      value: '',
      options: typesArray,
      showDropdown: false,
    },
    {
      name: 'attachmentType',
      value: '',
      options: attachmentTypesArray,
      showDropdown: false,
    },
    {
      name: 'finishType',
      value: '',
      options: finishTypesArray,
      showDropdown: false,
    },
    {
      name: 'state',
      value: '',
      options: statesArray,
      showDropdown: false,
    },
    {
      name: 'feature',
      value: '',
      options: featuresArray,
      showDropdown: false,
    },
    {
      name: 'colorName',
      value: '',
      options: colorNamesArray,
      showDropdown: false,
    },
    {
      name: 'colorHex',
      value: '',
      options: colorHexArray,
      showDropdown: false,
    },
    {
      name: 'status',
      value: '',
      options: ['Active', 'Not available'],
      showDropdown: false,
    },
    {
      name: 'dealer',
      value: '',
      options: dealersArray,
      showDropdown: false,
    },
    { name: 'name', value: '' },
    // Input without menu example
  ];

  const [fields, setFields] = useState(initialFields);
  const [directInputs, setDirectInputs] = useState({
    name: '',
    productDescription: '',
    shopName: '',
    link: '',
    price: '',
  });

  const handleInputChange = (name, value) => {
    setFields(
      fields.map(field =>
        field.name === name ? { ...field, value: value } : field
      )
    );
  };

  const handleOptionClick = (name, option) => {
    setFields(
      fields.map(field =>
        field.name === name
          ? { ...field, value: option, showDropdown: false }
          : field
      )
    );
  };

  const toggleDropdown = name => {
    setFields(
      fields.map(field =>
        field.name === name
          ? { ...field, showDropdown: !field.showDropdown }
          : field
      )
    );
  };

  const handleSubmit = event => {
    event.preventDefault();

    const unmatchedMaterial = fields.find(
      field => field.name === 'material'
    )?.value;

    if (unmatchedMaterial && !materials.includes(unmatchedMaterial)) {
      fetch(`${BASE_URL}/api/auth/materials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ material: unmatchedMaterial }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response from backend route:', data);
        })
        .catch(error => {
          console.error('Error sending data to  backend route:', error);
        });
    }

    const unmatchedState = fields.find(field => field.name === 'state')?.value;

    if (unmatchedState && !states.includes(unmatchedState)) {
      fetch(`${BASE_URL}/api/auth/states`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: unmatchedState }),
      })
        .then(response => response.json(console.log(response.json)))
        .then(data => {
          console.log('Response from other backend route:', data);
        })
        .catch(error => {
          console.error('Error sending data to other backend route:', error);
        });
    }

    const formData = [
      ...fields.map(field => ({ [field.name]: field.value })),
      ...Object.entries(directInputs).map(([key, value]) => ({ [key]: value })),
    ].reduce((acc, obj) => ({ ...acc, ...obj }), {});

    formData['image'] = uploadedImage;

    console.log('Form Data:', formData);

    fetch(`http://localhost:3000/api/auth/frames`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json(console.log(response.json)))
      .then(data => {
        console.log('Response from backend route:', data);
      })
      .catch(error => {
        console.error('Error sending data to other backend route:', error);
      });

    // Reset values after submission
    setFields(
      initialFields.map(field => ({ ...field, value: '', showDropdown: false }))
    );
    setDirectInputs({
      name: '',

      productDescription: '',

      // Reset direct input values
    });
    setUploadedImage('');
    alert('Form is successfully submitted');
  };

  const handleUpload = async event => {
    event.preventDefault();
    console.log('inside func');

    const originalFilename = file.name;

    // Send a request to the backend to get a pre-signed URL
    const uploadUrl = await fetch(
      `http://localhost:3000/api/auth/admin/s3Url/frames`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: originalFilename }),
      }
    )
      .then(res => res.json())
      .then(res => {
        return res.uploadURL;
      });

    // console.log(uploadUrl);

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/png',
      },
      body: file,
    });

    const imageUrl = uploadUrl.split('?')[0];
    console.log(imageUrl);
    setUploadedImage(imageUrl);
  };

  console.log('uploaded image', uploadedImage);

  return (
    <>
      <section className={css.add_dealers_section}>
        <div className={css.add_dealers_admin_thumb}>
          <div className={css.back_btn_thumb}>
            <img alt="back" className={css.back_icon} src={backArrow} />

            <Link to="/plate-frame">
              <button className={css.back_to_dealers_btn}>
                Back to frames
              </button>
            </Link>
          </div>
          <p className={css.add_dealer_text}>Add Plate</p>
          <form className={css.add_dealer_blocks_thumb}>
            <div>
              <div className={css.add_dealer_company_info}>
                <div
                  className={
                    !uploadedImage
                      ? css.add_dealer_upload_image_thumb
                      : css.uploaded_image_thumb
                  }
                >
                  {!uploadedImage ? (
                    <img
                      alt="dealer logo"
                      className={css.logo_icon}
                      src={dealerPhoto}
                    />
                  ) : (
                    <img
                      className={css.uploaded_image}
                      alt="uploaded plate"
                      height="150"
                      src={uploadedImage}
                    />
                  )}
                  <div className={css.add_dealer_upload_text}>
                    <label htmlFor="fileInput">
                      Click to upload
                      <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button className={css.upload_btn} onClick={handleUpload}>
                      <p>Upload Image</p>
                    </button>
                  </div>
                  <div className={css.border}></div>
                  {!uploadedImage && (
                    <p className={css.add_dealer_image_size}>
                      PNG or JPG recommended size (1000px*1000px)
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={css.dealer_contact_thumb}>
              <div className={css.add_dealer_contact_person}>
                <div className={css.add_dealer_company_thumb}>
                  <p className={css.add_dealer_company_text}>
                    Plate Frame Information
                  </p>
                  <ul className={css.add_dealer_company_list}>
                    <li className={css.company_item}>
                      <p className={css.company_label}>Name</p>

                      <input
                        type="text"
                        className={css.company_input}
                        value={directInputs.name}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            name: e.target.value,
                          })
                        }
                        placeholder="Name"
                      />
                    </li>
                    <li className={css.company_item}>
                      <div style={{ position: 'relative' }}>
                        <div className={css.filter_thumb_all}>
                          <p className={css.company_label}> Choose a dealer </p>
                          <input
                            className={css.company_input}
                            type="text"
                            value={
                              fields.find(field => field.name === 'dealer')
                                ?.value || ''
                            }
                            readOnly
                            placeholder="Select from the list"
                          />
                          {fields.find(field => field.name === 'dealer')
                            ?.options &&
                          fields.find(field => field.name === 'dealer')
                            .showDropdown ? (
                            <img
                              className={css.dropdown_arrow_open_menu}
                              src={openMenuIcon}
                              alt="Dropdown Arrow"
                              onClick={() => toggleDropdown('dealer')}
                            />
                          ) : (
                            <img
                              className={css.dropdown_arrow}
                              src={bottomArrow}
                              alt="Dropdown Arrow"
                              onClick={() => toggleDropdown('dealer')}
                            />
                          )}
                        </div>
                        {fields.find(field => field.name === 'dealer')
                          ?.showDropdown &&
                          fields.find(field => field.name === 'dealer')
                            ?.options && ( // Render dropdown menu if options exist
                            <ul className={css.menu_items_list} id="style-2">
                              {fields
                                .find(field => field.name === 'dealer')
                                ?.options.map((option, index) => (
                                  <li
                                    type="text"
                                    key={index}
                                    className={css.menu_item}
                                  >
                                    <label htmlFor={`dealer_option_${index}`}>
                                      <input
                                        className={css.input_checkbox}
                                        style={{ display: 'none' }}
                                        type="checkbox"
                                        id={`dealer_option_${index}`}
                                        checked={fields
                                          .find(
                                            field => field.name === 'dealer'
                                          )
                                          ?.value.includes(option)}
                                        onChange={() =>
                                          handleOptionClick('dealer', option)
                                        }
                                      />
                                      {/* Render the SVG icon */}
                                      <span
                                        className={css.customCheckbox}
                                      ></span>{' '}
                                      {option}
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          )}
                      </div>
                    </li>

                    <li>
                      <p className={css.product_description_label}>
                        Product description
                      </p>
                      <input
                        type="text"
                        className={css.company_input}
                        value={directInputs.productDescription}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            productDescription: e.target.value,
                          })
                        }
                        placeholder="Product description"
                      />
                    </li>
                  </ul>

                  <p className={css.add_dealer_company_text}>Add Filter</p>

                  <div className={css.menu_filters_thumb}>
                    <div
                      className={css.filter_thumb}
                      style={{ position: 'relative' }}
                    >
                      <div className={css.filter_thumb_all}>
                        <p className={css.company_label}>Material</p>
                        <input
                          className={css.filter_item_input}
                          type="text"
                          value={
                            fields.find(field => field.name === 'material')
                              ?.value || ''
                          }
                          onChange={event =>
                            handleInputChange('material', event.target.value)
                          }
                          placeholder="Start typing or select from the list"
                        />
                        {fields.find(field => field.name === 'material')
                          ?.options &&
                        fields.find(field => field.name === 'material')
                          .showDropdown ? (
                          <img
                            className={css.dropdown_arrow_open_menu}
                            src={openMenuIcon}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('material')}
                          />
                        ) : (
                          <img
                            className={css.dropdown_arrow}
                            src={bottomArrow}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('material')}
                          />
                        )}
                      </div>
                      {fields.find(field => field.name === 'material')
                        ?.showDropdown &&
                        fields.find(field => field.name === 'material')
                          ?.options && ( // Render dropdown menu if options exist
                          <ul className={css.menu_items_list} id="style-2">
                            {fields
                              .find(field => field.name === 'material')
                              ?.options.map((option, index) => (
                                <li className={css.menu_item} key={index}>
                                  <label htmlFor={`material_option_${index}`}>
                                    <input
                                      className={css.input_checkbox}
                                      style={{ display: 'none' }}
                                      type="checkbox"
                                      id={`material_option_${index}`}
                                      checked={fields
                                        .find(
                                          field => field.name === 'material'
                                        )
                                        ?.value.includes(option)}
                                      onChange={() =>
                                        handleOptionClick('material', option)
                                      }
                                    />
                                    {/* Render the SVG icon */}
                                    <span className={css.customCheckbox}></span>
                                    {option}
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div className={css.filter_thumb_all}>
                        <p className={css.company_label}> Choose type</p>
                        <input
                          className={css.filter_item_input}
                          type="text"
                          value={
                            fields.find(field => field.name === 'type')
                              ?.value || ''
                          }
                          onChange={event =>
                            handleInputChange('type', event.target.value)
                          }
                          placeholder="Start typing or select from the list"
                        />
                        {fields.find(field => field.name === 'type')?.options &&
                        fields.find(field => field.name === 'type')
                          .showDropdown ? (
                          <img
                            className={css.dropdown_arrow_open_menu}
                            src={openMenuIcon}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('type')}
                          />
                        ) : (
                          <img
                            className={css.dropdown_arrow}
                            src={bottomArrow}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('type')}
                          />
                        )}
                      </div>
                      {fields.find(field => field.name === 'type')
                        ?.showDropdown &&
                        fields.find(field => field.name === 'type')
                          ?.options && ( // Render dropdown menu if options exist
                          <ul className={css.menu_items_list} id="style-2">
                            {fields
                              .find(field => field.name === 'type')
                              ?.options.map((option, index) => (
                                <li key={index} className={css.menu_item}>
                                  <label htmlFor={`type_option_${index}`}>
                                    <input
                                      className={css.input_checkbox}
                                      style={{ display: 'none' }}
                                      type="checkbox"
                                      id={`type_option_${index}`}
                                      checked={fields
                                        .find(field => field.name === 'type')
                                        ?.value.includes(option)}
                                      onChange={() =>
                                        handleOptionClick('type', option)
                                      }
                                    />
                                    {/* Render the SVG icon */}
                                    <span
                                      className={css.customCheckbox}
                                    ></span>{' '}
                                    {option}
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div className={css.filter_thumb_all}>
                        <p className={css.company_label}> Choose finish type</p>
                        <input
                          className={css.filter_item_input}
                          type="text"
                          value={
                            fields.find(field => field.name === 'finishType')
                              ?.value || ''
                          }
                          onChange={event =>
                            handleInputChange('finishType', event.target.value)
                          }
                          placeholder="Start typing or select from the list"
                        />
                        {fields.find(field => field.name === 'finishType')
                          ?.options &&
                        fields.find(field => field.name === 'finishType')
                          .showDropdown ? (
                          <img
                            className={css.dropdown_arrow_open_menu}
                            src={openMenuIcon}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('finishType')}
                          />
                        ) : (
                          <img
                            className={css.dropdown_arrow}
                            src={bottomArrow}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('finishType')}
                          />
                        )}
                      </div>
                      {fields.find(field => field.name === 'finishType')
                        ?.showDropdown &&
                        fields.find(field => field.name === 'finishType')
                          ?.options && ( // Render dropdown menu if options exist
                          <ul className={css.menu_items_list} id="style-2">
                            {fields
                              .find(field => field.name === 'finishType')
                              ?.options.map((option, index) => (
                                <li key={index} className={css.menu_item}>
                                  <label htmlFor={`finishType_option_${index}`}>
                                    <input
                                      className={css.input_checkbox}
                                      style={{ display: 'none' }}
                                      type="checkbox"
                                      id={`finishType_option_${index}`}
                                      checked={fields
                                        .find(
                                          field => field.name === 'finishType'
                                        )
                                        ?.value.includes(option)}
                                      onChange={() =>
                                        handleOptionClick('finishType', option)
                                      }
                                    />
                                    {/* Render the SVG icon */}
                                    <span
                                      className={css.customCheckbox}
                                    ></span>{' '}
                                    {option}
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div className={css.filter_thumb_all}>
                        <p className={css.company_label}> Choose theme</p>
                        <input
                          className={css.filter_item_input}
                          type="text"
                          value={
                            fields.find(field => field.name === 'theme')
                              ?.value || ''
                          }
                          onChange={event =>
                            handleInputChange('theme', event.target.value)
                          }
                          placeholder="Start typing or select from the list"
                        />
                        {fields.find(field => field.name === 'theme')
                          ?.options &&
                        fields.find(field => field.name === 'theme')
                          .showDropdown ? (
                          <img
                            className={css.dropdown_arrow_open_menu}
                            src={openMenuIcon}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('theme')}
                          />
                        ) : (
                          <img
                            className={css.dropdown_arrow}
                            src={bottomArrow}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('theme')}
                          />
                        )}
                      </div>
                      {fields.find(field => field.name === 'theme')
                        ?.showDropdown &&
                        fields.find(field => field.name === 'theme')
                          ?.options && ( // Render dropdown menu if options exist
                          <ul className={css.menu_items_list} id="style-2">
                            {fields
                              .find(field => field.name === 'theme')
                              ?.options.map((option, index) => (
                                <li key={index} className={css.menu_item}>
                                  <label htmlFor={`theme_option_${index}`}>
                                    <input
                                      className={css.input_checkbox}
                                      style={{ display: 'none' }}
                                      type="checkbox"
                                      id={`theme_option_${index}`}
                                      checked={fields
                                        .find(field => field.name === 'theme')
                                        ?.value.includes(option)}
                                      onChange={() =>
                                        handleOptionClick('theme', option)
                                      }
                                    />
                                    {/* Render the SVG icon */}
                                    <span
                                      className={css.customCheckbox}
                                    ></span>{' '}
                                    {option}
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div className={css.filter_thumb_all}>
                        <p className={css.company_label}>
                          {' '}
                          Choose attachment type
                        </p>
                        <input
                          className={css.filter_item_input}
                          type="text"
                          value={
                            fields.find(
                              field => field.name === 'attachmentType'
                            )?.value || ''
                          }
                          onChange={event =>
                            handleInputChange(
                              'attachmentType',
                              event.target.value
                            )
                          }
                          placeholder="Start typing or select from the list"
                        />
                        {fields.find(field => field.name === 'attachmentType')
                          ?.options &&
                        fields.find(field => field.name === 'attachmentType')
                          .showDropdown ? (
                          <img
                            className={css.dropdown_arrow_open_menu}
                            src={openMenuIcon}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('attachmentType')}
                          />
                        ) : (
                          <img
                            className={css.dropdown_arrow}
                            src={bottomArrow}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('attachmentType')}
                          />
                        )}
                      </div>
                      {fields.find(field => field.name === 'attachmentType')
                        ?.showDropdown &&
                        fields.find(field => field.name === 'attachmentType')
                          ?.options && ( // Render dropdown menu if options exist
                          <ul className={css.menu_items_list} id="style-2">
                            {fields
                              .find(field => field.name === 'attachmentType')
                              ?.options.map((option, index) => (
                                <li key={index} className={css.menu_item}>
                                  <label
                                    htmlFor={`attachmentType_option_${index}`}
                                  >
                                    <input
                                      className={css.input_checkbox}
                                      style={{ display: 'none' }}
                                      type="checkbox"
                                      id={`attachmentType_option_${index}`}
                                      checked={fields
                                        .find(
                                          field =>
                                            field.name === 'attachmentType'
                                        )
                                        ?.value.includes(option)}
                                      onChange={() =>
                                        handleOptionClick(
                                          'attachmentType',
                                          option
                                        )
                                      }
                                    />
                                    {/* Render the SVG icon */}
                                    <span
                                      className={css.customCheckbox}
                                    ></span>{' '}
                                    {option}
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div className={css.filter_thumb_all}>
                        <p className={css.company_label}>
                          {' '}
                          Choose additional features
                        </p>
                        <input
                          className={css.filter_item_input}
                          type="text"
                          value={
                            fields.find(field => field.name === 'feature')
                              ?.value || ''
                          }
                          onChange={event =>
                            handleInputChange('feature', event.target.value)
                          }
                          placeholder="Start typing or select from the list"
                        />
                        {fields.find(field => field.name === 'feature')
                          ?.options &&
                        fields.find(field => field.name === 'feature')
                          .showDropdown ? (
                          <img
                            className={css.dropdown_arrow_open_menu}
                            src={openMenuIcon}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('feature')}
                          />
                        ) : (
                          <img
                            className={css.dropdown_arrow}
                            src={bottomArrow}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('feature')}
                          />
                        )}
                      </div>
                      {fields.find(field => field.name === 'feature')
                        ?.showDropdown &&
                        fields.find(field => field.name === 'feature')
                          ?.options && ( // Render dropdown menu if options exist
                          <ul className={css.menu_items_list} id="style-2">
                            {fields
                              .find(field => field.name === 'feature')
                              ?.options.map((option, index) => (
                                <li key={index} className={css.menu_item}>
                                  <label htmlFor={`feature_option_${index}`}>
                                    <input
                                      className={css.input_checkbox}
                                      style={{ display: 'none' }}
                                      type="checkbox"
                                      id={`feature_option_${index}`}
                                      checked={fields
                                        .find(field => field.name === 'feature')
                                        ?.value.includes(option)}
                                      onChange={() =>
                                        handleOptionClick('feature', option)
                                      }
                                    />
                                    {/* Render the SVG icon */}
                                    <span
                                      className={css.customCheckbox}
                                    ></span>{' '}
                                    {option}
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div className={css.filter_thumb_all}>
                        <p className={css.company_label}>Choose color name</p>
                        <input
                          className={css.filter_item_input}
                          type="text"
                          value={
                            fields.find(field => field.name === 'colorName')
                              ?.value || ''
                          }
                          onChange={event =>
                            handleInputChange('colorName', event.target.value)
                          }
                          placeholder="Start typing or select from the list"
                        />
                        {fields.find(field => field.name === 'colorName')
                          ?.options &&
                        fields.find(field => field.name === 'colorName')
                          .showDropdown ? (
                          <img
                            className={css.dropdown_arrow_open_menu}
                            src={openMenuIcon}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('colorName')}
                          />
                        ) : (
                          <img
                            className={css.dropdown_arrow}
                            src={bottomArrow}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('colorName')}
                          />
                        )}
                      </div>
                      {fields.find(field => field.name === 'colorName')
                        ?.showDropdown &&
                        fields.find(field => field.name === 'colorName')
                          ?.options && ( // Render dropdown menu if options exist
                          <ul className={css.menu_items_list} id="style-2">
                            {fields
                              .find(field => field.name === 'colorName')
                              ?.options.map((option, index) => (
                                <li key={index} className={css.menu_item}>
                                  <label htmlFor={`colorName_option_${index}`}>
                                    <input
                                      className={css.input_checkbox}
                                      style={{ display: 'none' }}
                                      type="checkbox"
                                      id={`colorName_option_${index}`}
                                      checked={fields
                                        .find(
                                          field => field.name === 'colorName'
                                        )
                                        ?.value.includes(option)}
                                      onChange={() =>
                                        handleOptionClick('colorName', option)
                                      }
                                    />
                                    {/* Render the SVG icon */}
                                    <span
                                      className={css.customCheckbox}
                                    ></span>{' '}
                                    {option}
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div className={css.filter_thumb_all}>
                        <p className={css.company_label}>Choose color hex</p>
                        <input
                          className={css.filter_item_input}
                          type="text"
                          value={
                            fields.find(field => field.name === 'colorHex')
                              ?.value || ''
                          }
                          onChange={event =>
                            handleInputChange('colorHex', event.target.value)
                          }
                          placeholder="Start typing or select from the list"
                        />
                        {fields.find(field => field.name === 'colorHex')
                          ?.options &&
                        fields.find(field => field.name === 'colorHex')
                          .showDropdown ? (
                          <img
                            className={css.dropdown_arrow_open_menu}
                            src={openMenuIcon}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('colorHex')}
                          />
                        ) : (
                          <img
                            className={css.dropdown_arrow}
                            src={bottomArrow}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('colorHex')}
                          />
                        )}
                      </div>
                      {fields.find(field => field.name === 'colorHex')
                        ?.showDropdown &&
                        fields.find(field => field.name === 'colorHex')
                          ?.options && ( // Render dropdown menu if options exist
                          <ul className={css.menu_items_list} id="style-2">
                            {fields
                              .find(field => field.name === 'colorHex')
                              ?.options.map((option, index) => (
                                <li key={index} className={css.menu_item}>
                                  <label htmlFor={`colorHex_option_${index}`}>
                                    <input
                                      className={css.input_checkbox}
                                      style={{ display: 'none' }}
                                      type="checkbox"
                                      id={`colorHex_option_${index}`}
                                      checked={fields
                                        .find(
                                          field => field.name === 'colorHex'
                                        )
                                        ?.value.includes(option)}
                                      onChange={() =>
                                        handleOptionClick('colorHex', option)
                                      }
                                    />
                                    {/* Render the SVG icon */}
                                    <span
                                      className={css.customCheckbox}
                                    ></span>{' '}
                                    {option}
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div className={css.filter_thumb_all}>
                        <p className={css.company_label}> Choose state </p>
                        <input
                          className={css.filter_item_input}
                          type="text"
                          value={
                            fields.find(field => field.name === 'state')
                              ?.value || ''
                          }
                          onChange={event =>
                            handleInputChange('state', event.target.value)
                          }
                          placeholder="Start typing or select from the list"
                        />
                        {fields.find(field => field.name === 'state')
                          ?.options &&
                        fields.find(field => field.name === 'state')
                          .showDropdown ? (
                          <img
                            className={css.dropdown_arrow_open_menu}
                            src={openMenuIcon}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('state')}
                          />
                        ) : (
                          <img
                            className={css.dropdown_arrow}
                            src={bottomArrow}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('state')}
                          />
                        )}
                      </div>
                      {fields.find(field => field.name === 'state')
                        ?.showDropdown &&
                        fields.find(field => field.name === 'state')
                          ?.options && ( // Render dropdown menu if options exist
                          <ul className={css.menu_items_list} id="style-2">
                            {fields
                              .find(field => field.name === 'state')
                              ?.options.map((option, index) => (
                                <li key={index} className={css.menu_item}>
                                  <label htmlFor={`state_option_${index}`}>
                                    <input
                                      className={css.input_checkbox}
                                      style={{ display: 'none' }}
                                      type="checkbox"
                                      id={`state_option_${index}`}
                                      checked={fields
                                        .find(field => field.name === 'state')
                                        ?.value.includes(option)}
                                      onChange={() =>
                                        handleOptionClick('state', option)
                                      }
                                    />
                                    {/* Render the SVG icon */}
                                    <span
                                      className={css.customCheckbox}
                                    ></span>{' '}
                                    {option}
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div className={css.filter_thumb_all}>
                        <p className={css.company_label}> Choose status </p>
                        <input
                          className={css.filter_item_input}
                          type="text"
                          value={
                            fields.find(field => field.name === 'status')
                              ?.value || ''
                          }
                          readOnly
                          placeholder="Select from the list"
                        />
                        {fields.find(field => field.name === 'status')
                          ?.options && ( // Render dropdown arrow if options exist
                          <img
                            className={css.dropdown_arrow}
                            src={bottomArrow}
                            alt="Dropdown Arrow"
                            onClick={() => toggleDropdown('status')}
                          />
                        )}
                      </div>
                      {fields.find(field => field.name === 'status')
                        ?.showDropdown &&
                        fields.find(field => field.name === 'status')
                          ?.options && ( // Render dropdown menu if options exist
                          <ul className={css.menu_items_list} id="style-2">
                            {fields
                              .find(field => field.name === 'status')
                              ?.options.map((option, index) => (
                                <li key={index} className={css.menu_item}>
                                  <label htmlFor={`status_option_${index}`}>
                                    <input
                                      className={css.input_checkbox}
                                      style={{ display: 'none' }}
                                      type="checkbox"
                                      id={`status_option_${index}`}
                                      checked={fields
                                        .find(field => field.name === 'status')
                                        ?.value.includes(option)}
                                      onChange={() =>
                                        handleOptionClick('status', option)
                                      }
                                    />
                                    <span className={css.customCheckbox}></span>{' '}
                                    {option}
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>
                  </div>

                  <p className={css.add_dealer_company_text}>
                    Add link and price
                  </p>

                  <ul className={css.add_item_filter_list}>
                    <li className={css.filter_item}>
                      <p className={css.company_label}>Shop name</p>
                      <input
                        type="text"
                        className={css.company_input}
                        value={directInputs.shopName}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            shopName: e.target.value,
                          })
                        }
                        placeholder="Amazon"
                      />
                    </li>
                    <li className={css.filter_item}>
                      <p className={css.company_label}>
                        Attach a link to the product
                      </p>
                      <input
                        type="text"
                        className={css.company_input}
                        value={directInputs.link}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            link: e.target.value,
                          })
                        }
                        placeholder="Link"
                      />
                    </li>
                    <li className={css.filter_item}>
                      <p className={css.company_label}> Price ($) </p>
                      <input
                        type="text"
                        className={css.company_input}
                        value={directInputs.price}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            price: e.target.value,
                          })
                        }
                        placeholder="Price"
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className={css.add_dealer_buttons_thumb}>
                <Link to="/license-plates">
                  <button className={css.cancel_btn}>Cancel</button>
                </Link>
                <button onClick={handleSubmit} className={css.add_dealer_btn}>
                  Add frame
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default AddLicensePlateFrame;
