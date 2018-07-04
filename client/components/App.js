//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import ViewJobInfo from './VIewJobInfo';
import EmpFeedback from './EmpFeedback';
import Update from './Update';
import Delete from './Delete';
import { Tab, Tabs } from 'react-bootstrap';
import YearTabsRouter from './tabs/yearTabsRouter';
import MonthTabs from './tabs/monthTabs';
import Header from './Header';
import SideBar from './SideBar';
import Content from './Content';


export default class App extends React.Component {
constructor() {
    super();
    this.state = {isClicked:false,selectedCandidate_Name:'Karthik'};
    console.log("caling getdata");
    this.getData = this.getData.bind(this);
  }
componentWillReceiveProps(nextProps) {
    if(nextProps.history.location.search){
    var search = nextProps.history.location.search;
    search = search.substring(1);
    var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
   // this.setState({activeTab: parseInt(searchObj.year)});
    //this.setState({selectedYear: searchObj.year});
    this.setState({selectedCandidate_Name: searchObj.candidate_name});
this.getData(this, searchObj.candidate_name);
  }else{
      this.getData(this,'Karthik');
    }
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
<div>
        <Header />
        
        <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
        
              
        {this.state.isClicked &&

        <table>
          <thead>
            <tr><th className='button-col'>Job ID</th><th className='button-col'>Designation</th><th className='button-col'>Experience</th><th className='button-col'>Month</th><th className='button-col'>Year</th><th className='button-col'>Update</th><th className='button-col'>Delete</th></tr>
          </thead>
          <tbody>
            {
              this.state.data.map((exp) => {
                return  <tr><td className='counterCell'></td><td className='desc-col'>{exp.Candidate_Name}</td></tr>
              })
            }
            </tbody>
</table>}



        <SideBar />
        <Content />
      </div>
      </div>
    );
  }
}
