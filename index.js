const forms = document.getElementById("forms");
const save_btn = document.getElementById("save_btn");
const sub_container = document.getElementById("sub_container");
const updateBtn = document.getElementById("updateBtn");
const templates = document.getElementById("templates");
const update_submit_btn = document.getElementById("update_submit_btn");
const templateNameInput = document.getElementById('templateName');

let templateCurrentUpdateId = null;

// post json
const postJson = {
  uid: 119,
  cid: 239987,
  template: [
    {
      id: 1,
      tName: "",
      tDetail: {
        rule: [
          {
            id: 1,
            attributeName: "",
            type: "String",
            operator: "==",
            value: [],
            point: 0,
            isPlus: false,
          },
        ],
      },
    },
  ],
};

// template json
const tJson = [
  {
    id: 1,
    selected: "Industry",
    points: 0,
    isPlus: "plus",
    sizeVals: [],
    indsVals: [],
    countryVals: [],
    descVals: [],
    fundsVals: [],
    hasFundVals: "Yes",
    growthVals: "Yes",
    size: {
      attrName: "Size",
      attrLabel: "Size is any of below",
      attrType: "String",
      attrStruct: "Array",
      attrOps: "AnyOF",
      attrValAllowed: [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1001-5000",
        "5000-10,000",
        "10,000+",
      ],
    },
    ind: {
      attrName: "Industry",
      attrLabel: "Industry is any of the below",
      attrType: "String",
      attrStruct: "Array",
      attrOps: "AnyOf",
      attrValAllowed: ['Information Technology And Services', 'Hospital & Health Care', 'Construction', 'Retail', 'Education Management', 'Financial Services', 'Accounting', 'Computer Software', 'Higher Education', 'Automotive', 'Government Administration', 'Marketing and Advertising', 'Banking', 'Health, Wellness and Fitness', 'Real Estate', 'Food & Beverages', 'Telecommunications', 'Oil & Energy', 'Mechanical or Industrial Engineering', 'Hospitality', 'Primary/Secondary Education', 'Electrical/Electronic Manufacturing', 'Internet', 'Insurance', 'Consumer Services', 'Medical Practice', 'Human Resources', 'Transportation/Trucking/Railroad', 'Restaurants', 'Civil Engineering', 'Pharmaceuticals', 'Design', 'Logistics and Supply Chain', 'Research', 'Management Consulting', 'Architecture & Planning', 'Apparel & Fashion', 'Food Production', 'Law Practice', 'Facilities Services', 'Consumer Goods', 'Non-Profit Organization Management', 'Machinery', 'Entertainment', 'Chemicals', 'Wholesale', 'Arts and Crafts', 'Farming', 'Utilities', 'Legal Services', 'Sports', 'Mining & Metals', 'Airlines/Aviation', 'Building Materials', 'Leisure, Travel & Tourism', 'Environmental Services', 'Professional Training & Coaching', 'Medical Devices', 'Music', 'Individual & Family Services', 'Cosmetics', 'Staffing and Recruiting', 'Mental Health Care', 'Graphic Design', 'Industrial Automation', 'Security and Investigations', 'Biotechnology', 'Aviation & Aerospace', 'Business Supplies and Equipment', 'Public Relations and Communications', 'Import and Export', 'Textiles', 'Writing and Editing', 'Consumer Electronics', 'Media Production', 'Renewables & Environment', 'Broadcast Media', 'International Trade and Development', 'Military', 'Computer Networking', 'Civic & Social Organization', 'Events Services', 'Photography', 'E-Learning', 'Computer Hardware', 'Computer & Network Security', 'Defense & Space', 'Furniture', 'Fine Art', 'Warehousing', 'Printing', 'Investment Management', 'Outsourcing/Offshoring', 'Publishing', 'Information Services', 'Law Enforcement', 'Supermarkets', 'Animation', 'Maritime', 'Executive Office', 'Religious Institutions', 'Government Relations', 'Semiconductors', 'Program Development', 'Plastics', 'Online Media', 'Public Safety', 'Packagingand Containers', 'Commercial Real Estate', 'Alternative Medicine', 'Motion Pictures and Film', 'Judiciary', 'Performing Arts', 'Computer Games', 'Veterinary', 'Luxury Goods & Jewelry', 'Investment Banking', 'Package/Freight Delivery', 'International Affairs', 'Market Research', 'Recreational Facilities and Services', 'Translation and Localization', 'Wine and Spirits', 'Capital Markets', 'Public Policy', 'Sporting Goods', 'Newspapers', 'Paper & Forest Products', 'Venture Capital & Private Equity', 'Wireless', 'Libraries', 'Gambling & Casinos', 'Ranching', 'Glass, Ceramics & Concrete', 'Philanthropy', 'Dairy', 'Shipbuilding', 'Museums and Institutions', 'Think Tanks', 'Political Organization', 'Fishery', 'Horticulture New', 'Tobacco', 'Fund-Raising', 'Railroad Manufacture', 'Alternative Dispute Resolution', 'Nanotechnology', 'Legislative Office', 'Mobile Games'],
    },
    country: {
      attrName: "Country",
      attrLabel: "Country is any of the below",
      attrType: "String",
      attrStruct: "Array",
      attrOps: "AnyOf",
      attrValAllowed: ['Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh', 'Belgium', 'Bolivia', 'Bosnia', 'Brazil', 'Bulgaria', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Korea', 'Kuwait', 'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malaysia', 'Malta', 'Mauritius', 'Mexico', 'Morocco', 'Nepal', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Russian Federation', 'Saudi Arabia', 'Singapore', 'Slovak Republic', 'Slovenia', 'South Africa', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan', 'Tanzania', 'Thailand', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela', 'Vietnam', 'Zimbabwe'],
    },
    desc: {
      attrName: "Description",
      attrLabel: "Company description contains any of the below",
      attrType: "String",
      attrStruct: "Array",
      attrOps: "AnyOf",
      attrValAllowed: [],
    },
    growth: {
      attrName: "Growth",
      attrLabel: "Is company growing",
      attrType: "String",
      attrStruct: "Non-Array",
      attrOps: "OneOf",
      attrValAllowed: ["Yes", "No"],
    },
    hasfunding: {
      attrName: "HasFunding",
      attrLabel: "Is company funded",
      attrType: "String",
      attrStruct: "Non-Array",
      attrOps: "OneOf",
      attrValAllowed: ["Yes", "No"],
    },
    fundinground: {
      attrName: "Fundinground",
      attrLabel: "Is company funded",
      attrType: "String",
      attrStruct: "Array",
      attrOps: "AnyOf",
      attrValAllowed: [
        "No funding info",
        "Seed",
        "Series A",
        "Series B",
        "Series C",
        "Series D",
        "Series E",
        "Series F",
        "Public",
      ],
    },
  },
];

// templatejson ends

// reusable functions

// get template data from the localStorage
function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("template"));
  return data;
}

// set template data to the localStorage
function setLocalStorage(params) {
  localStorage.setItem("template", JSON.stringify(params));
}

// templates cards creator function
function cards(params) {
  const cards = params
    ?.map((i, idx) => {
      const label =
        i?.selected === "Industry"
          ? i?.ind.attrLabel
          : i?.selected === "Size"
          ? i?.size.attrLabel
          : i?.selected === "Country"
          ? i?.country.attrLabel
          : i?.selected === "Description"
          ? i?.desc.attrLabel
          : i?.selected === "Growth"
          ? i?.growth.attrLabel
          : i?.selected === "HasFunding"
          ? i?.hasfunding.attrLabel
          : i?.selected === "Fundinground"
          ? i?.fundinground.attrLabel
          : "";

      const inds =
        i?.selected === "Industry"
          ? i?.ind.attrValAllowed
          : i?.selected === "Size"
          ? i?.size.attrValAllowed
          : i?.selected === "Country"
          ? i?.country.attrValAllowed
          : i?.selected === "Description"
          ? i?.desc.attrValAllowed
          : i?.selected === "Growth"
          ? i?.growth.attrValAllowed
          : i?.selected === "HasFunding"
          ? i?.hasfunding.attrValAllowed
          : i?.selected === "Fundinground"
          ? i?.fundinground.attrValAllowed
          : [];

      const attrNames = [
        i?.ind.attrName,
        i?.size.attrName,
        i?.country.attrName,
        i?.desc.attrName,
        i?.growth.attrName,
        i?.hasfunding.attrName,
        i?.fundinground.attrName,
      ];

      const pointsVal = ["plus", "minus"];

      function showFields() {
        switch (i.selected) {
          case "Growth":
            return `
            <select id="growthVals" onchange="confirmVal(this.value, '${
              i.id
            }', 'growth')">
              ${inds
                .map(
                  (a) =>
                    `<option ${
                      a === params[idx].growthVals ? "selected" : ""
                    } value=${a}>${a}</option>`
                )
                .join("")}
            </select>`;
          case "HasFunding":
            return `
            <select id="hasFundVals" onchange="confirmVal(this.value, '${
              i.id
            }', 'hasfunding')">
              ${inds
                .map(
                  (a) =>
                    `<option ${
                      a === params[idx].hasFundVals ? "selected" : ""
                    } value=${a}>${a}</option>`
                )
                .join("")}
            </select>`;
          case "Description":
            return `
            <div class="chips_container">
                <input placeholder="Add chips" id="chipsInput" onkeypress="handleChipSubmit(event,'${idx}')">
                <div class="chips_son">${inds
                  .map(
                    (c) =>
                      `
                  <div class="chip">
                    <span class="chip_values" style="margin-right: 5px;">${c}</span>
                    <span onclick="delChips('${c}','${idx}')" style="border: 1px solid #ccc;padding: 2px 3px; font-size: 9px;cursor: pointer;margin-right: 4px;">&#10005;</span>
                  </div>
                `
                  )
                  .join("")}</div>
            </div>  
          `;
          default:
            return `<div class="dropdownContainer">
          <label class="dropdown-label" id="drop_label">
            <span class="drop_label_txt">Select options</span>
            <span class="drop_label_arrow">&#8595;</span>
          </label>
            <div class="drop_list" id="drop_list">
              <div class="dropdown_search">
                <input onkeyup="searchDropdownItems(this, '${idx}')" class="dropdown_search-input" type="text" placeholder="Search in ${inds.length} ${i.selected}">
              </div>
                  ${inds
                    .map(
                      (m) => `
                  <div class="list_items">
                    <label class="drop_items">
                        <input onclick="inputCheck(this, '${idx}')" type="checkbox" class="checkboxes" value="${m}">
                        <span class="checkBox_labels">${m}</span>
                    </label>
                  </div>
              `).join("")}
            </div>
      </div>`;
        }
      };

      return `
          <div class="card_form" id="card_form">
              <div class="score_cards" id="score_cards">
                  <div class="score_input">
                  <p style="margin-bottom: 10px;">Score Rule</p>
                    <label>Attribute</label>
                      <select id="attrValues" class="attrValues" onchange="selectType(this.value,'${
                        i.id
                      }')">
                        ${attrNames
                          .map(
                            (n) =>
                              `<option ${
                                n === params[idx].selected ? "selected" : ""
                              } value=${n}>${n}</option>`
                          )
                          .join("")}
                      </select>
                  </div>
                <div class="contents">
                  <div class="when" id="when">
                    <p>when</p>
                    <small id="labels" style="margin-bottom: 7px;display:block;">${label}</small>
                <div class="when_selection">
                    ${showFields()}
                </div>
              </div>
                  <div class="and" id="and">
                    <p>Then updates points by</p>
                    <div class="and_selection">
                    <select id="plus" class="plus" onchange="plusMinus(this.value,'${
                      i.id
                    }')">
                      ${pointsVal
                        .map(
                          (p) =>
                            `<option ${
                              p === params[idx].isPlus ? "selected" : ""
                            } value=${p}>${p}</option>`
                        )
                        .join("")}
                    </select>
                    <input type="number" id="points" class="points" onchange="pointHandler(this.value, '${
                      i.id
                    }')" value="${
        i.points
      }" style="width: 100px; margin-left:5px;">
                    </div>
                    </div>
                </div>
                  <hr>
                  <div class="card_footer">
                    <button onclick="delCards('${
                      i.id
                    }'); return false" class="delCard">Delete</button>
                    <button onclick="cloneCards('${
                      i.id
                    }', '${idx}'); return false">clone</button>
                  </div>
              </div>
          </div>
          `;
    })
    .join("");
  forms.innerHTML = cards;
}

// reusable functions end

(function(){
  const data = getLocalStorage();
  const ptJson = getPostJson();
  if(data === null){
    setLocalStorage(tJson); 
  }
  if(ptJson ===null){
    storePostJson(postJson);
  }
})();

function createCards() {
  const data = getLocalStorage();
  cards(data);
  dropDowns();
}

function confirmVal(val, idx, type) {
  const templateJson = getLocalStorage();
  const id = parseInt(idx);

  let updated = [];

  if (type === "growth") {
    updated = templateJson.map((m) =>
      m.id === id ? { ...m, growthVals: val } : m
    );
  } else if (type === "hasfunding") {
    updated = templateJson.map((m) =>
      m.id === id ? { ...m, hasFundVals: val } : m
    );
  }

  setLocalStorage(updated);
}

function handleChipSubmit(e, idx) {
  if (e.keyCode == 13) {
    e.preventDefault();
    const templatejsn = getLocalStorage();
    const index = parseInt(idx);
    templatejsn[index].desc.attrValAllowed.push(e.target.value);

    setLocalStorage(templatejsn);
    cards(templatejsn);
    dropDowns();
  }
}

function delChips(val, idx) {
  const templateJsn = getLocalStorage();
  const index = parseInt(idx);
  const updated = templateJsn[index].desc.attrValAllowed.filter(
    (f) => f !== val
  );
  templateJsn[index].desc.attrValAllowed = updated;

  setLocalStorage(templateJsn);
  cards(templateJsn);
  dropDowns();
}

function cloneCards(pra) {
  const data = getLocalStorage();

  if (Array.isArray(data)) {
    const newList = data.find(({ id }) => id === parseInt(pra));
    const updated = [...data, { ...newList, id: data.length + 1 }];

    setLocalStorage(updated);
    cards(updated);
    dropDowns();
  }
}

function delCards(param) {
  const data = getLocalStorage();
  if (Array.isArray(data)) {
    if (data.length === 1) return;
    const newList = data.filter((f) => f.id !== parseInt(param));

    setLocalStorage(newList);
    cards(newList);
    dropDowns();
  }
}

function selectType(val, id) {
  const data = getLocalStorage();
  const updated = data.map((m) =>
    m.id === parseInt(id) ? { ...m, selected: val } : m
  );

  setLocalStorage(updated);
  cards(updated);
  dropDowns();
}

function plusMinus(val, id) {
  const data = getLocalStorage();
  const updated = data.map((m) =>
    m.id === parseInt(id) ? { ...m, isPlus: val } : m
  );
  setLocalStorage(updated);
}

function pointHandler(val, id) {
  const data = getLocalStorage();
  const updated = data.map((m) =>
    m.id === parseInt(id) ? { ...m, points: val } : m
  );
  setLocalStorage(updated);
}

// template update functionalities

function handleTempUiForUpdate(val){
  const ptJson = getPostJson();
  const templateJsn = getLocalStorage();
  let tem = [];

  ptJson.template.forEach((i) => {
    if (i.tName === val) {
      templateCurrentUpdateId = i.id;
      const validTemplates = i.tDetail.rule.filter((f)=> (f.tName !== ''));
      tem = validTemplates;
    }
  });

  let inds = [];
  let sizes = [];
  let growth = "";
  let hasFund = "";
  let fund = [];
  let desc = [];
  let country = [];

  let attrNames = "Industry";

  const ts = tem.map((m, idx) => {
    switch (m.attributeName) {
      case "Size":
        sizes = m.value;
        attrNames = "Size";
        break;
      case "Industry":
        inds = m.value;
        attrNames = "Industry";
        break;
      case "Description":
        desc = m.value;
        attrNames = "Description";
        break;
      case "Country":
        country = m.value;
        attrNames = "Country";
        break;
      case "Growth":
        growth = m.value;
        attrNames = "Growth";
        break;
      case "HasFunding":
        hasFund = m.value;
        attrNames = "HasFunding";
        break;
      case "Fundinground":
        fund = m.value;
        attrNames = "Fundinground";
        break;
      default:
        break;
    }

    return {
      ...templateJsn[0],
      id: idx + 1,
      selected: attrNames,
      points: m.points,
      isPlus: m.isPlus ? 'plus': 'minus',
      sizeVals: sizes,
      indsVals: inds,
      countryVals: country,
      desc: { ...templateJsn[0].desc, attrValAllowed: desc },
      fundsVals: fund,
      growthVals: growth,
      hasFundVals: hasFund,
    };
  });

  setLocalStorage(ts);
  cards(ts);
  dropDowns();
}

// update button function when click
function updateTemplate(e) {
  e.preventDefault();
  const ptJson = getPostJson();
  const validTemplates = ptJson?.template.filter(temp=> temp.tName !== '');

  const templates = document.getElementById("templates");
  const templateName = document.getElementById("templateName");

  if (validTemplates.length < 1)
    return alert("Please enter a template name, and save");

  if (templateName.style.display === "none") {
    templateName.style.display = "block";
    update_submit_btn.style.display = "none";
    save_btn.style.display = "block";
    e.target.innerText = "Update";
  } else {
    templateName.style.display = "none";
    e.target.innerText = "Cancel";
    update_submit_btn.style.display = "block";
    save_btn.style.display = "none";
  }

  if (templates.style.display === "block") {
    templates.style.display = "none";
  } else {
    templates.style.display = "block";
    templates.innerHTML = `
          ${ptJson.template
            .map(
              (i) => i.tName !== '' && `<option value="${i.tName}">${i.tName}</option>`)
            .join("")}
      `;
  }

  handleTempUiForUpdate(templates.value);

  if(e.target.innerText !== 'Cancel'){
    console.log('not cancelled');
    setLocalStorage(tJson)
    cards(tJson);
    dropDowns();
  }
}


// after values updated for the cards fields
function submitUpdate(e) {
  e.preventDefault();
  const ptJson = getPostJson();
  const validTemplates = ptJson?.template.filter(temp=> temp.tName !== '');
  const templateJsn = getLocalStorage();
  const templateName = document.getElementById("templateName");

  if (ptJson !== null) {
    validTemplates.forEach(({ id, tDetail }) => {
      if (id === templateCurrentUpdateId) {
        const tds = templateJsn.map(({ id }, idx) => {
          const card_form = document.querySelectorAll(".card_form");
          const checkInputs = card_form[idx].querySelectorAll(".checkboxes");
          const attrValues = card_form[idx].querySelector(".attrValues");
          const plus = card_form[idx].querySelector(".plus");
          const points = card_form[idx].querySelector(".points");
          const chips = card_form[idx].querySelectorAll(".chip_values");
          const hasFundVals = card_form[idx].querySelector("#hasFundVals");
          const growthVals = card_form[idx].querySelector("#growthVals");

          const plusVal = plus.value;
          const pointsVal = parseInt(points.value);
          const selectOptVal = attrValues.value;
          let growth = "";
          let hasFund = "";

          let valueArr = [];

          checkInputs.forEach((i) => {
            if (i.checked) {
              valueArr.push(i.value);
            }
          });

          chips.forEach((c) => {
            valueArr.push(c.textContent);
          });

          if (hasFundVals !== null) {
            hasFund = hasFundVals.value;
            valueArr = hasFund;
          }
          if (growthVals !== null) {
            growth = growthVals.value;
            valueArr = growth;
          }

          return {
            id: id,
            attributeName: selectOptVal,
            type: "String",
            operator: "==",
            value: valueArr,
            points: pointsVal,
            isPlus: plusVal === "plus" ? true : false,
          };
        });

        tDetail.rule = tds;
      }
    });
  }
  ptJson.template = validTemplates;
  storePostJson(ptJson);
  console.log("Update submitted: ", ptJson);


  if (templateName.style.display === "none") {
    templates.style.display = 'none';
    templateName.style.display = "block";
    update_submit_btn.style.display = "none";
    save_btn.style.display = "block";
    updateBtn.innerText = "Update";
  } else {
    templateName.style.display = "none";
    updateBtn.innerText = "Cancel";
    update_submit_btn.style.display = "block";
    save_btn.style.display = "none";
    templates.style.display = 'block';
  }
  // setting the default values again after updated
  setLocalStorage(tJson)
  cards(tJson);
  dropDowns();
  templateNameInput.value = '';
};

// select multiple items from dropdown
function changeLabelText(param, idx) {
  const card_form = document.querySelectorAll(".card_form");
  const drop_label = card_form[idx].querySelector("#drop_label");
  const drop_label_txt = drop_label.querySelector('.drop_label_txt');
  const checkboxes = card_form[idx].querySelectorAll(".checkboxes");

  param.length === 0
    ? (drop_label_txt.innerText = "Select options")
    : param.length === checkboxes.length
    ? (drop_label_txt.innerText = "All selected")
    : (drop_label_txt.innerText = `Selected ${param.length}`);
}

// custom multi select dropdown checkboxes function
function inputCheck(val, idx) {
  const index = parseInt(idx);
  const data = getLocalStorage();
  const card_form = document.querySelectorAll(".card_form");
  const attrValues = card_form[index].querySelector(".attrValues").value;

  let {
    country,
    fundinground,
    ind,
    size,
    sizeVals,
    indsVals,
    fundsVals,
    countryVals,
  } = data[index];


  if(val.checked){
    switch (attrValues) {
      case ind.attrName:
        indsVals.push(val.value);
        break;
      case size.attrName:
        sizeVals.push(val.value);
        break;
      case country.attrName:
        countryVals.push(val.value);
        break;
      case fundinground.attrName:
        fundsVals.push(val.value);
        break;
      default:
        break;
    }
  }else{
    switch (attrValues) {
      case ind.attrName:
        data[index].indsVals = indsVals.filter((f) => f !== val.value);
        break;
      case size.attrName:
        data[index].sizeVals = sizeVals.filter((f) => f !== val.value);
        break;
      case country.attrName:
        data[index].countryVals = countryVals.filter((f) => f !== val.value);
        break;
      case fundinground.attrName:
        data[index].fundsVals = fundsVals.filter((f) => f !== val.value);
        break;
      default:
        break;
    }
  }

  // // changing dropdown label text
  switch (attrValues) {
    case ind.attrName:
      changeLabelText(data[index].indsVals, index);
      break;
    case size.attrName:
      changeLabelText(data[index].sizeVals, index);
      break;
    case country.attrName:
      changeLabelText(data[index].countryVals, index);
      break;
    case fundinground.attrName:
      changeLabelText(data[index].fundsVals, index);
      break;
    default:
      break;
  };

  setLocalStorage(data);
}

// custom multi select dropdown creator function
function checkBoxes(i, elems) {
  elems.forEach((element) => {
    element === i.value && (i.checked = true);
  });
};

function dropDowns() {
  const card_form = document.querySelectorAll(".card_form");
  const selectionField = document.querySelectorAll(".when_selection");
  const data = getLocalStorage();

  selectionField.forEach((i, idx) => {
    const dropsLabel = i.querySelector('#drop_label');
    const drop_list = i.querySelector("#drop_list");
    const attrValues = card_form[idx].querySelector(".attrValues").value;
    const checkboxes = card_form[idx].querySelectorAll(".checkboxes");
    // selecting the selected values when the cards loads
    const {
      country,
      fundinground,
      ind,
      size,
      sizeVals,
      indsVals,
      fundsVals,
      countryVals
    } = data[idx];

    checkboxes.forEach((c) => {
      switch (attrValues) {
        case ind.attrName:
          checkBoxes(c, indsVals);
          break;
        case size.attrName:
          checkBoxes(c, sizeVals);
          break;
        case country.attrName:
          checkBoxes(c, countryVals);
          break;
        case fundinground.attrName:
          checkBoxes(c, fundsVals);
          break;
        default:
          break;
      }
    });

    // changing dropdown label text
    switch (attrValues) {
      case ind.attrName:
        changeLabelText(indsVals, idx);
        break;
      case size.attrName:
        changeLabelText(sizeVals, idx);
        break;
      case country.attrName:
        changeLabelText(countryVals, idx);
        break;
      case fundinground.attrName:
        changeLabelText(fundsVals, idx);
        break;
      default:
        break;
    };

    // toggling the dropdown on clicking
    if(dropsLabel !== null){
      const drop_label_arrow = dropsLabel.querySelector('.drop_label_arrow');
      dropsLabel.addEventListener('click', function(e){
       if(drop_list.style.display === "block"){
        drop_label_arrow.innerHTML = '&#8595;';
        drop_list.style.display = "none";
       }else{
        drop_list.style.display = "block";
        drop_label_arrow.innerHTML = '&#8593;';
       }
      })
    }
  });
}

// search dropdown items
function searchDropdownItems(e, idx){
  const index = parseInt(idx);
  const inputVal = e.value.toLowerCase().trim();
  const card_form = document.querySelectorAll(".card_form")[index];
  const list = card_form.querySelectorAll('.list_items');

  list.forEach((listItem)=> {
    const labels = listItem.querySelector('.checkBox_labels');
    const keyword = labels.textContent || labels.innerText;
    if (keyword.toLowerCase().includes(inputVal)) {
      listItem.style.display = '';
    } else {
      listItem.style.display = 'none';
    }
  });
}

// store postjson in the localStorage
function storePostJson(param) {
  localStorage.setItem("postJson", JSON.stringify(param));
}

// get post json from the localStorage
function getPostJson() {
  const data = JSON.parse(localStorage.getItem("postJson"));
  return data;
}

// event listeners
templates.addEventListener("change", (e)=> handleTempUiForUpdate(e.target.value));
updateBtn.addEventListener("click", updateTemplate);
update_submit_btn.addEventListener("click", submitUpdate);

document.addEventListener("DOMContentLoaded", () => {
  createCards();

  // template submittion
  sub_container.addEventListener("submit", function (e) {
    e.preventDefault();
    const ptJson = getPostJson();
    const validTemplates = ptJson?.template.filter(temp=> temp.tName !== '');
    const templateData = getLocalStorage();

    const templateName = document.getElementById("templateName");
    const templateNameVal = templateName.value;
    if (templateNameVal === "") return alert("Please enter template name!");


    let checkSameName = false;

    validTemplates.forEach(({tName})=> (tName === templateNameVal && (checkSameName = true)));

    if(checkSameName)return alert('Template name already exist!');

    // create cards for postJson
    const allCards = templateData.map((_, idx) => {
      const card_form = document.querySelectorAll(".card_form");
      const checkInputs = card_form[idx].querySelectorAll(".checkboxes");
      const attrValues = card_form[idx].querySelector(".attrValues");
      const plus = card_form[idx].querySelector(".plus");
      const points = card_form[idx].querySelector(".points");
      const chips = card_form[idx].querySelectorAll(".chip_values");
      const hasFundVals = card_form[idx].querySelector("#hasFundVals");
      const growthVals = card_form[idx].querySelector("#growthVals");

      const plusVal = plus.value;
      const pointsVal = parseInt(points.value);
      const selectOptVal = attrValues.value;
      let growth = "";
      let hasFund = "";

      let valueArr = [];

      checkInputs.forEach((i) => {
        if (i.checked) {
          valueArr.push(i.value);
        }
      });

      chips.forEach((c) => {
        valueArr.push(c.textContent);
      });

      if (hasFundVals !== null) {
        hasFund = hasFundVals.value;
        valueArr = hasFund;
      }
      if (growthVals !== null) {
        growth = growthVals.value;
        valueArr = growth;
      }

      return {
        id: idx + 1,
        attributeName: selectOptVal,
        type: "String",
        operator: "==",
        value: valueArr,
        points: pointsVal,
        isPlus: plusVal === "plus" ? true : false,
      };
    });

    const defaultObj = {
      id: validTemplates.length + 1,
      tName: templateNameVal,
      tDetail: {
        rule: allCards,
      },
    };

    validTemplates.push(defaultObj);
    ptJson.template = validTemplates;

    storePostJson(ptJson);
    console.log("postJson:", ptJson);
  // setting the default values again after updated
  setLocalStorage(tJson)
  cards(tJson);
  dropDowns();
    templateNameInput.value = '';
  });
});