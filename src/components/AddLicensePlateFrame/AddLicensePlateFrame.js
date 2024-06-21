import css from './AddLicensePlateFrame.module.css';
import { Link } from 'react-router-dom';
import backArrow from '../icons/backArrow.svg';
import imageUpload from '../icons/imageUpload.svg';
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
  const [colors, setColors] = useState([]);
  const [colorsName, setColorsName] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [states, setStates] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [uploadedImage, setUploadedImage] = useState('');
  const [uploadedBackground, setUploadedBackground] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const BASE_URL = 'https://platejade-back.onrender.com';

  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [backgroundFileSelected, setBackgroundFileSelected] = useState(false);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
    setFileSelected(true);
  };

  const handleBackgroundFileChange = event => {
    setBackgroundFile(event.target.files[0]);
    setBackgroundFileSelected(true);
  };

  useEffect(() => {
    // RECEIVE AND SET DEALERS
    fetch(`${BASE_URL}/api/auth/all-dealers`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const availableDealers = result.dealers.filter(
          item => item.company_name !== undefined
        );
        const dealersArray = Array.from(
          new Set(availableDealers.map(item => item.company_name))
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

    // RECEIVE AND SET NAMES AND  COLORS
    fetch(`${BASE_URL}/api/auth/colors`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const colorNamesArray = Array.from(
          new Set(result.colors.map(item => item.colorName))
        );
        const colorArray = Array.from(
          new Set(result.colors.map(item => item.color))
        );

        const colorsArrayWithoutEmptyValues = colorArray
          .flat()
          .filter(color => color !== '');

        setColors(colorsArrayWithoutEmptyValues);
        setColorsName(colorNamesArray);

        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'colorName') {
              return { ...field, options: colorNamesArray };
            }
            if (field.name === 'color') {
              return { ...field, options: colorsArrayWithoutEmptyValues };
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

    // RECEIVE AND SET CONDITIONS
    fetch(`${BASE_URL}/api/auth/conditions`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const conditionsArray = Array.from(
          new Set(result.conditions.map(item => item.condition))
        );
        setConditions(conditionsArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'condition') {
              return { ...field, options: conditionsArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    setRefresh(false);
  }, [refresh]);

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

  const colorArray = Array.from(new Set(colors.map(item => item.color)));

  const themesArray = Array.from(new Set(themes.map(item => item.theme)));

  const statesArray = Array.from(new Set(states.map(item => item.state)));

  const dealersArray = Array.from(new Set(dealers.map(item => item.dealers)));

  console.log(themesArray);

  const conditionsArray = Array.from(
    new Set(conditions.map(item => item.condition))
  );

  console.log(conditionsArray);

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
      name: 'color',
      value: '',
      options: colorArray,
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
    {
      name: 'condition',
      value: '',
      options: conditionsArray,
      showDropdown: false,
    },
    // { name: 'name', value: '' },
    // Input without menu example
  ];

  const [fields, setFields] = useState(initialFields);
  const [directInputs, setDirectInputs] = useState({
    name: '',
    productDescription: '',
    firstShopName: '',
    amazonLink: '',
    link: '',
    amazonPrice: '',
    secondShopName: '',
    secondShopLink: '',
    secondShopPrice: '',
  });

  // Handler function to toggle selection of a checkbox or set input values
  const handleInputChange = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleOptionClick = (name, option) => {
    const selectedField = fields.find(field => field.name === name);
    const currentValue = selectedField.value || [];

    let updatedValue;
    if (currentValue.includes(option)) {
      updatedValue = currentValue.filter(item => item !== option);
    } else {
      updatedValue = [...currentValue, option];
    }

    const updatedFields = fields.map(field =>
      field.name === name ? { ...field, value: updatedValue } : field
    );

    setFields(updatedFields);
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

    // const unmatchedMaterial = fields.find(
    //   field => field.name === 'material'
    // )?.value;

    // if (unmatchedMaterial && !materials.includes(unmatchedMaterial)) {
    //   fetch(`${BASE_URL}/api/auth/materials`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ material: unmatchedMaterial }),
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('Response from backend route:', data);
    //     })
    //     .catch(error => {
    //       console.error('Error sending data to backend route:', error);
    //     });
    // }

    // const unmatchedState = fields.find(field => field.name === 'state')?.value;

    // if (unmatchedState && !states.includes(unmatchedState)) {
    //   fetch(`${BASE_URL}/api/auth/states`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ state: unmatchedState }),
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('Response from other backend route:', data);
    //     })
    //     .catch(error => {
    //       console.error('Error sending data to other backend route:', error);
    //     });
    // }

    const formData = {};

    fields.forEach(field => {
      formData[field.name] = field.value;
    });

    const dealersArray = fields.find(field => field.name === 'dealer')?.value;
    const dealersString = dealersArray ? dealersArray.join(', ') : '';

    formData['dealer'] = dealersString;

    Object.entries(directInputs).forEach(([key, value]) => {
      formData[key] = value;
    });

    formData['image'] = uploadedImage;
    formData['backgroundImages'] = uploadedBackground;

    if (formData.colorName === 'Multicolor') {
      formData['color'] = ['E66465', '9198E5'];
    } else if (formData.colorName === 'Transparent') {
      formData['color'] = [''];
    }

    // console.log('Form Data:', JSON.stringify(formData));

    fetch(`${BASE_URL}/api/auth/frames`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from backend route:', data);
      })
      .catch(error => {
        console.error('Error sending data to other backend route:', error);
      });

    setFields(
      initialFields.map(field => ({ ...field, value: '', showDropdown: false }))
    );
    // setDirectInputs({
    //   name: '',
    //   productDescription: '',
    //   // Reset direct input values
    // });
    setUploadedImage('');

    setShowNotification(true);
    // setRefresh(true);
  };

  const handleUpload = async event => {
    event.preventDefault();

    const originalFilename = file.name;

    // Send a request to the backend to get a pre-signed URL
    const uploadUrl = await fetch(`${BASE_URL}/api/auth/admin/s3Url/frames`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: originalFilename }),
    })
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
    setFileSelected(false);
  };

  const handleUploadBackground = async event => {
    event.preventDefault();
    // console.log('inside func');
    // console.log(file);

    const originalFilename = backgroundFile.name;

    // Send a request to the backend to get a pre-signed URL
    const uploadUrl = await fetch(
      `${BASE_URL}/api/auth/admin/s3Url/backgrounds`,
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
      body: backgroundFile,
    });

    const imageUrl = uploadUrl.split('?')[0];
    console.log(imageUrl);
    setUploadedBackground(imageUrl);
    setBackgroundFileSelected(false);
  };

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
          <p className={css.add_dealer_text}>Add Frame</p>
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
                      src={imageUpload}
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
                    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                    {!fileSelected ? "Click to select image" : ""}
                      
                      <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {fileSelected && (
                    <button className={css.upload_btn} onClick={handleUpload}>
                      <p>Click to upload</p>
                    </button>
                    )}
                  </div>
                  <div className={css.border}></div>
                  {!uploadedImage && (
                    <p className={css.add_dealer_image_size}>
                      PNG or JPG recommended size (1000px*1000px)
                    </p>
                  )}
                </div>
              </div>

              <div className={css.add_dealer_company_info}>
                <div
                  className={
                    !uploadedBackground
                      ? css.add_dealer_upload_image_thumb
                      : css.uploaded_image_thumb
                  }
                >
                  {!uploadedBackground ? (
                    <img
                      alt="dealer logo"
                      className={css.logo_icon}
                      src={imageUpload}
                    />
                  ) : (
                    <img
                      className={css.uploaded_image}
                      alt="uploaded plate"
                      height="150"
                      src={uploadedBackground}
                    />
                  )}
                  <div className={css.add_dealer_upload_text}>
                    <label htmlFor="backgroundFileInput" style={{ cursor: 'pointer' }}>
                    {!backgroundFileSelected ? "Click to select background" : ""}
                      <input
                        type="file"
                        id="backgroundFileInput"
                        onChange={handleBackgroundFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {backgroundFileSelected && (
                    <button
                      className={css.upload_btn}
                      onClick={handleUploadBackground}
                    >
                      <p>Click to upload background</p>
                    </button>
                    )}
                  </div>
                  <div className={css.border}></div>
                  {!uploadedBackground && (
                    <p className={css.add_dealer_image_size}>
                      PNG or JPG recommended size (1000px*1000px)
                    </p>
                  )}
                </div>
              </div>
            </div>

            {showNotification && (
              <div className={css.notification_modal}>
                <p className={css.notification_message}>
                  You have successfully added the frame
                </p>
                <Link to="/plate-frame">
                  <button className={css.notification_button}>OK</button>
                </Link>
              </div>
            )}

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
                              className={css.dropdown_arrow_open_menu_dealers}
                              src={openMenuIcon}
                              alt="Dropdown Arrow"
                              onClick={() => toggleDropdown('dealer')}
                            />
                          ) : (
                            <img
                              className={css.dropdown_arrow_dealers}
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
                            <ul
                              className={css.menu_items_list_dealers}
                              id="style-2"
                            >
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

                    <li className={css.company_input_description}>
                      <p className={css.product_description_label}>
                        Product description
                      </p>
                      <textarea
                        type="text"
                        className={css.company_input}
                        value={directInputs.productDescription}
                        onChange={e => {
                          setDirectInputs({
                            ...directInputs,
                            productDescription: e.target.value,
                          })
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }
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
                      {fields
                        .filter(field => field.name !== 'dealer') // Filter out fields with name "dealer"
                        .map((field, index) => (
                          <div
                            key={index}
                            className={css.filter_option}
                            style={{ position: 'relative' }}
                          >
                            <div className={css.filter_thumb_all}>
                              <p className={css.company_label}>
                                Add {field.name}
                              </p>
                              <input
                                className={css.filter_item_input}
                                type="text"
                                value={field.value || ''}
                                onChange={event =>
                                  handleInputChange(
                                    field.name,
                                    event.target.value
                                  )
                                }
                                placeholder={`Start typing or select from the list`}
                              />
                              {field.options && field.showDropdown ? (
                                <img
                                  className={css.dropdown_arrow_open_menu}
                                  src={openMenuIcon}
                                  alt="Dropdown Arrow"
                                  onClick={() => toggleDropdown(field.name)}
                                />
                              ) : (
                                <img
                                  className={css.dropdown_arrow}
                                  src={bottomArrow}
                                  alt="Dropdown Arrow"
                                  onClick={() => toggleDropdown(field.name)}
                                />
                              )}
                            </div>
                            {field.showDropdown && field.options && (
                              <ul
                                className={css.menu_items_list}
                                id={`style-2`}
                              >
                                {field.options.map((option, optionIndex) => (
                                  <li
                                    className={css.menu_item}
                                    key={optionIndex}
                                  >
                                    <label
                                      htmlFor={`${field.name}_option_${optionIndex}`}
                                    >
                                      <input
                                        className={css.input_checkbox}
                                        style={{ display: 'none' }}
                                        type="checkbox"
                                        id={`${field.name}_option_${optionIndex}`}
                                        checked={(field.value || []).includes(
                                          option
                                        )}
                                        onChange={() =>
                                          handleOptionClick(field.name, option)
                                        }
                                      />
                                      <span
                                        className={css.customCheckbox}
                                      ></span>
                                      {option}
                                    </label>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
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
                        value={directInputs.firstShopName}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            firstShopName: e.target.value,
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
                        value={directInputs.amazonLink}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            amazonLink: e.target.value,
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
                        value={directInputs.amazonPrice}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            amazonPrice: e.target.value,
                          })
                        }
                        placeholder="Price"
                      />
                    </li>
                  </ul>
                  <ul className={css.add_item_filter_list}>
                    <li className={css.filter_item}>
                      <p className={css.company_label}>Second shop name</p>
                      <input
                        type="text"
                        className={css.company_input}
                        value={directInputs.secondShopName}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            secondShopName: e.target.value,
                          })
                        }
                        placeholder="Shop name"
                      />
                    </li>
                    <li className={css.filter_item}>
                      <p className={css.company_label}>
                        Attach a link to the product
                      </p>
                      <input
                        type="text"
                        className={css.company_input}
                        value={directInputs.secondShopLink}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            secondShopLink: e.target.value,
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
                        value={directInputs.secondShopPrice}
                        onChange={e =>
                          setDirectInputs({
                            ...directInputs,
                            secondShopPrice: e.target.value,
                          })
                        }
                        placeholder="Price"
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className={css.add_dealer_buttons_thumb}>
                <Link to="/plate-frame">
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
