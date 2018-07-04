//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');
class EmpFeedback extends React.Component {
constructor() {
    super();
    this.state = {isClicked:false,selectedCandidate_Name:'Karthik'};
    console.log("caling getdata");
    this.getData = this.getData.bind(this);
      //this.handleSelectChange = this.handleSelectChange.bind(this);
      //this.onClick = this.onClick.bind(this);
      //this.handleTextChange = this.handleTextChange.bind(this);
      //this.insertNewExpense = this.insertNewExpense.bind(this);
      //this.openModal = this.openModal.bind(this);
      //this.closeModal = this.closeModal.bind(this);
    }
    componentWillReceiveProps(nextProps) {

        this.getData(this,'Karthik');
           }
    componentDidMount(){
        this.getData(this,'Karthik');
      }
    handleSelect(selectedTab) {
         this.setState({
           activeTab: selectedTab,
           selectedYear: selectedTab
         });
      }
    getData(ev, candidate_name){
      console.log("called getdata");
        axios.get('/getAll?candidate_name='+candidate_name)
          .then(function(response) {
            
            ev.setState({data: response.data});
              console.log(ev.state.data);
              ev.setState({isClicked:true});
    //        ev.setState({selectedCandidate_Name: candidate_name});
          //  ev.setState({selectedMonth: month});
          });
    }



    render() {
        return (
          <div>
    
                            
            {this.state.isClicked &&
    
            <table>
              <thead>
                <tr><th className='button-col'>Employer Feed back :</th></tr>
              </thead>
              <tbody>
                {
                  this.state.data.map((exp) => {
                    return  <tr><td className='counterCell'></td><td className='desc-col'>{exp.Interview_Remarks}</td></tr>
                  })
                }
                </tbody>
    </table>}
          </div>
        );
      }
}
export default EmpFeedback



