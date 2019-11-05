import React, { Component } from 'react';
// import CountryOptions from "./CountryOptions";
// import DepartmentOptions from "./DepartmentOptions";
import Select from "react-select";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../css/style.css';
import { resolve } from 'dns';

const smartApi = "https://api.smartrecruiters.com/api-v1/companies/Infobip/postings?";
const singlePageUrl = "https://www.infobip.com/en/careers/careers-2019-single?srid=";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function cl(x) {
  return console.log(x);
}

function getUnique(arr, comp) {
  var unique = arr.map(function (e) {
    return e[comp];
  }).map(function (e, i, final) {
    return final.indexOf(e) === i && i;
  }).filter(function (e) {
    return arr[e];
  }).map(function (e) {
    return arr[e];
  });
  return unique;
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesOptions: [...options],
      departmentsOptions: [...options],
      countryOpt: "",
      departmentOpt: "",
      jobsByCountry: null,
      jobsByDepartment: null
    }
    this.runCountriesOptions = this.runCountriesOptions.bind(this);
    this.runDepartmentsOptions = this.runDepartmentsOptions.bind(this);
    this.checkFilters = this.checkFilters.bind(this);
    this.getAllJobs = this.getAllJobs.bind(this);
    this.setOptions = this.setOptions.bind(this);
  }

  async runCountriesOptions() {
    const response = await fetch(smartApi);
    const json = await response.json();
    const countryOptionsFirst = await json.content.map(function (item) {
      return {
        value: item.location.country,
        label: item.customField[0].valueLabel
      };
    });
    const responseSecond = await fetch(`${smartApi}&offset=100`);
    const jsonSecond = await responseSecond.json();
    const countryOptionsSecond = await jsonSecond.content.map(function (item) {
      return {
        value: item.location.country,
        label: item.customField[0].valueLabel
      };
    });
    const responseThird = await fetch(`${smartApi}&offset=100`);
    const jsonThird = await responseThird.json();
    const countryOptionsThird = await jsonThird.content.map(function (item) {
      return {
        value: item.location.country,
        label: item.customField[0].valueLabel
      };
    });
    let countriesOptions = countryOptionsFirst.concat(
      countryOptionsSecond,
      countryOptionsThird
    ).filter(function (item) {
      return item.value !== "rs";
    });
    countriesOptions = getUnique(countriesOptions, "value");
    countriesOptions.sort(function (a, b) {
      return a.label > b.label ? 1 : -1;
    }).forEach(function (item) {
      if (item.label === "Bosnia and Herzegowina") {
        item.label = "Bosnia and Herzegovina";
      }
    });
    this.setState({ countriesOptions });
  }

  async runDepartmentsOptions() {
    const response = await fetch(smartApi);
    const json = await response.json();
    const departmentOptionsFirst = await json.content.map(function (item) {
      return {
        value: item.department.id,
        label: item.department.label
      };
    });
    const responseSecond = await fetch(`${smartApi}&offset=100`);
    const jsonSecond = await responseSecond.json();
    const departmentOptionsSecond = await jsonSecond.content.map(function (item) {
      return {
        value: item.department.id,
        label: item.department.label
      };
    });
    const responseThird = await fetch(`${smartApi}&offset=100`);
    const jsonThird = await responseThird.json();
    const departmentOptionsThird = await jsonThird.content.map(function (item) {
      return {
        value: item.department.id,
        label: item.department.label
      };
    });
    let departmentsOptions = departmentOptionsFirst.concat(
      departmentOptionsSecond,
      departmentOptionsThird
    );
    let departmentOptionsFiltered = departmentsOptions.filter(function (item) {
      return item.label && !item.label.includes("Centili");
    });
    departmentOptionsFiltered = getUnique(departmentOptionsFiltered, "value");
    departmentOptionsFiltered.sort(function (a, b) {
      return a.label > b.label ? 1 : -1;
    });
    this.setState({ departmentsOptions: departmentOptionsFiltered });
  }

  async getAllJobs() {
    const response = await fetch(smartApi);
    const json = await response.json();
    const jobsFirst = await json.content.map(function (item) {
      return {
        name: item.name,
        city: item.location.city,
        countryId: item.location.country,
        country: item.customField[0].valueLabel,
        department: item.department.label,
        departmentId: item.department.id,
        ref: item.ref,
        singlePageUrl: singlePageUrl + item.id
      };
    });
    const responseSecond = await fetch(`${smartApi}&offset=100`);
    const jsonSecond = await responseSecond.json();
    const jobsSecond = await jsonSecond.content.map(function (item) {
      return {
        name: item.name,
        city: item.location.city,
        countryId: item.location.country,
        country: item.customField[0].valueLabel,
        department: item.department.label,
        departmentId: item.department.id,
        ref: item.ref,
        singlePageUrl: singlePageUrl + item.id
      };
    });
    const responseThird = await fetch(`${smartApi}&offset=200`);
    const jsonThird = await responseThird.json();
    const jobsThird = await jsonThird.content.map(function (item) {
      return {
        name: item.name,
        city: item.location.city,
        countryId: item.location.country,
        country: item.customField[0].valueLabel,
        department: item.department.label,
        departmentId: item.department.id,
        ref: item.ref,
        singlePageUrl: singlePageUrl + item.id
      };
    });
    const jobs = jobsFirst.concat(
      jobsSecond,
      jobsThird
    ).sort(function (a, b) {
      return a.name > b.name ? 1 : -1;
    }).filter(function (item) {
      return item.countryId && item.countryId !== "rs";
    });
    jobs.forEach(function (item) {
      if (item.country === "Bosnia and Herzegowina") {
        item.country = "Bosnia and Herzegovina";
      }
    });
  }

  // fetch('http://example.com/movies.json')
  // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(myJson) {
  //   console.log(JSON.stringify(myJson));
  // });

  getJobs(filter, value) {
    return fetch(`${smartApi}${filter}=${value}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json.content.map(function (item) {
          return {
            name: item.name,
            city: item.location.city,
            countryId: item.location.country,
            country: item.customField[0].valueLabel,
            department: item.department.label,
            departmentId: item.department.id,
            ref: item.ref,
            singlePageUrl: singlePageUrl + item.id
          };
        }).filter(function (item) {
          return item.countryId && item.countryId !== "rs";
        });
      })
  }

  checkFilters(country, department) {
    if (country === "all" || country.length === 0) {
      if (department === "all" || department.length === 0) {
        this.getAllJobs();
      }
    }

    if (country === "all" || country.length === 0) {
      if (department !== "all" || department.length !== 0) {
        // const jobs = this.getJobs("department", department);
        // jobs.then((val) => {
        //   return cl(val);
        // })
      }
    }

    if (country !== "all" || country.length !== 0) {
      if (department === "all" || department.length === 0) {
        // const jobs = this.getJobs("country", country);
        // jobs.then((val) => {
        //   return cl(val);
        // })
      }
    }

    if (country !== "all" && country.length !== 0) {
      if (department !== "all" && department.length !== 0) {
        const jobsByCountry = this.getJobs("country", country);
        cl(jobsByCountry);
        // this.getJobs("department", department).then(function (val) {
        //   this.setState({ jobsByDepartment: val });
        // }.bind(this));
            // val.forEach(function (item) {
            //   document.querySelector(".aimo").innerHTML += `<div>${item.name}</div><div>${item.city}</div>`;
            // })
        // isus = jobsCountry.filter(function (item) {
        //   return department.indexOf(item.departmentId) > -1;
        // });
        // isus = jobsDepartment.filter(function (item) {
        //   return country.indexOf(item.countryId) > -1;
        // });
      }
    }
  }

  setOptions(opt, id) {
    this.setState({ [id.name]: opt.value });
  }

  componentDidUpdate() {
    this.checkFilters(this.state.countryOpt, this.state.departmentOpt);
  }

  componentDidMount() {
    this.runCountriesOptions();
    this.runDepartmentsOptions();
  }

  render() {
    return (
      <div>
        <div className="filter-container">
          <Container>
            <Row>
              <Col>
                <div className="filter-box">

                  <Row>
                    <Col md={4}>
                      <Select 
                        name="countryOpt"
                        options={this.state.countriesOptions}
                        placeholder="Country"
                        onChange={this.setOptions}
                        />
                    </Col>

                    <Col md={{ span: 4, offset: 1 }}>
                      <Select 
                        name="departmentOpt"
                        options={this.state.departmentsOptions}
                        placeholder="Department"
                        onChange={this.setOptions}
                       />
                    </Col>
                  </Row>

                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="list-container">
          <Container>
            <Row>
              <Col>
                <div className="list-box">

                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

export default App;
