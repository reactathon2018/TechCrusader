//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');
class Add extends React.Component {
constructor() {
      super();
this.state = {
        feedback: '',
        rating: '',
        messageFromServer: '',
        modalIsOpen: false
      }
this.handleSelectChange = this.handleSelectChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.insertNewExpense = this.insertNewExpense.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
openModal() {
      this.setState({
        modalIsOpen: true
      });
    }
closeModal() {
      this.setState({
        modalIsOpen: false,
        feedback: '',
        rating: '5',
        month: 'Jan',
        messageFromServer: ''
      });
    }
componentDidMount() {
    if(this.props.selectedating == 'All'){
      this.setState({
        rating: '5'
      });
    }else{
      this.setState({
        rating: this.props.selectedRating
      });
    }
this.setState({
        month: this.props.selectedMonth
      });
    }
componentWillReceiveProps(nextProps){
      if(this.props.selectedRating == 'All'){
        this.setState({
          rating: '5'
        });
      }else{
        this.setState({
          rating: this.props.selectedRating
        });
      }
this.setState({
        month:nextProps.selectedMonth
      })
    }
handleSelectChange(e) {
      if (e.target.name == 'rating') {
        this.setState({
          rating: e.target.value
        });
      }
      if (e.target.name == 'month') {
        this.setState({
          month: e.target.value
        });
      }
    }
onClick(e) {
      this.insertNewExpense(this);
    }
insertNewExpense(e) {
      axios.post('/insert',
        querystring.stringify({
          feedback: e.state.feedback,
          rating: e.state.rating,
          month: e.state.month
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
        e.setState({
          messageFromServer: response.data
        });
      });
    }
handleTextChange(e) {
      if (e.target.name == "feedback") {
        this.setState({
          feedback: e.target.value
        });
      }
if (e.target.name == "rating") {
        this.setState({
          rating: e.target.value
        });
      }
    }
render() {
   if(this.state.messageFromServer == ''){
      return (
        <div>
      <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span>Add Feedback</Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Feedback"
       className="Modal">
<Link to={{pathname: '/', search: '?rating='+this.state.rating+'&month='+this.state.month }} style={{ textDecoration: 'none' }}>
       <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
      </Link><br/>
<fieldset>
  
<label for="feedback">Feedback:</label><input type="textArea" rows="4" cols="50" id="feedback" name="feedback" value={this.state.feedback} onChange={this.handleTextChange}></input>

       <label for="rating">Rating☆☆:</label><select id="rating" name="rating" value={this.state.rating} onChange={this.handleSelectChange}>
          <option value="1" id="1">1</option>
            <option value="2" id="2">2</option>
            <option value="3" id="3">3</option>
            <option value="4" id="4">4</option>
            <option value="5" id="5">5</option>
         </select>
       <label for="month">Month:</label><select id="month" name="month" value={this.state.month} onChange={this.handleSelectChange}>
            <option value="Jan" id="Jan">January</option>
            <option value="Feb" id="Feb">Febrary</option>
            <option value="Mar" id="Mar">March</option>
            <option value="Apr" id="Apr">April</option>
            <option value="May" id="May">May</option>
            <option value="Jun" id="Jun">June</option>
            <option value="Jul" id="Jul">July</option>
            <option value="Aug" id="Aug">August</option>
            <option value="Sep" id="Sep">September</option>
            <option value="Oct" id="Oct">October</option>
            <option value="Nov" id="Nov">November</option>
            <option value="Dec" id="Dec">December</option>
         </select>
         </fieldset>
<div className='button-center'>
        <br/>
        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Review your Feedback before Submit </Button>
       </div>
          </Modal>
        </div>
      )
   }
   else{
    return (
     <div>
       <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
       <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Add Feedback"
        className="Modal">
<div className='button-center'>
        <h3>{this.state.messageFromServer}</h3>
        <Link to={{pathname: '/', search: '?rating='+this.state.rating+'&month='+this.state.month}} style={{ textDecoration: 'none' }}>
         <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
        </Link>
       </div>
      </Modal>
       </div>
     )
    }
   }
}
export default Add



