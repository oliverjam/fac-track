import React, { Component } from 'react';

const api = url =>
  fetch(url).then(
    res =>
      res.status !== 200
        ? Promise.reject({
            status: res.status,
            message: res.statusText || 'A fetch error occurred',
          })
        : res.json()
  );

const validateCodewars = ({
  ranks: {
    languages: { javascript },
  },
  codeChallenges: { totalAuthored },
}) => {
  return Math.abs(javascript.rank) <= 5 && totalAuthored >= 1;
};

class Form extends Component {
  state = {
    website: '',
    fcc: '',
    codewars: '',
    codewarsData: {},
  };
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = event => {
    event.preventDefault();
    const {
      website: { value: website },
      fcc: { value: fcc },
      codewars: { value: codewars },
    } = event.target.elements;
    // const codewarsDone = api(
    //   `/.netlify/functions/codewars?username=${codewars}`
    // ).then(validateCodewars);
    api(`/.netlify/functions/website?website=${website}`).then(
      ({ freecodecamp, codewars }) =>
        this.setState({
          fcc: freecodecamp.username,
          codewars: codewars.username,
          codewarsData: codewars,
        })
    );
    // Promise.all([codewarsDone]).then(console.log);
  };
  render() {
    const { website, fcc, codewars } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="website">Your website: </label>
        <input
          type="text"
          id="website"
          name="website"
          value={website}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="fcc">Free Code Camp: </label>
        <input
          type="text"
          id="fcc"
          name="fcc"
          value={fcc}
          onChange={this.handleChange}
        />
        <label htmlFor="codewars">Codewars: </label>
        <input
          type="text"
          id="codewars"
          name="codewars"
          value={codewars}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Form;
