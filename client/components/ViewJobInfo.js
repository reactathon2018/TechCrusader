//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Responsive from 'react-responsive';

import { SegmentedControl, SegmentedControlItem, View, Box, Text, Button  } from 'react-desktop/macOs';
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const divStyle={'background-color':'#c30000','color':'white','font-family':'fantasy'};

class ViewJobInfo extends React.Component {
constructor() {
    super();
  this.state = {selected: 1,Candidate_id:1,isClicked:false,data:[{}]};
    this.getData = this.getData.bind(this);
  }


getData(){
  var self = this;
  console.log(this.state.Candidate_id);
    axios.get('/viewAppliedJobIds?Candidate_id='+this.state.Candidate_id)
      .then(function(response) {
        console.log( response.data);

      // console.log(JSON.stringify(response.data[0])!=JSON.stringify({}));
       if(JSON.stringify(response.data[0])!=JSON.stringify({})){
         console.log(response.data.length);
         var result = [];
         var obj=response.data;
         for(var i=0;i<response.data.length;i++){
           console.log(response.data[i].Job_Id_Applied);
           result.push(response.data[i].Job_Id_Applied);
         }

         axios.get('/viewAppliedJobDetails?Job_Id_Applied='+result)
           .then(function(response1) {

             console.log(response1.data);
             this.setState({data: response1.data});
           }.bind(this)).catch((error)=>{
            console.log(error);
         });


         this.setState({isClicked:true});
       }

      }.bind(this)).catch((error)=>{
       console.log(error);
    });
}
render() {
    return (
      <div>


       <Button color="blue" onClick={this.getData}>View Applied Jobs</Button>
{this.state.isClicked &&
       <table className='table'>

                 <tbody>
                   {
                     this.state.data.map((exp) => {
                       return <div> <tr style={divStyle}>
                      <td className='counterCell'></td>
                      <td  >Jobid: {exp.Job_id} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                       Designation : {exp.Designation}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                       Experience : {exp.Experience}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                       JobLocation : {exp.Job_Location}</td>
</tr><tr>
                     <td >Role: </td>
                     <td className='button-col'>{exp.Job_Role}</td></tr>
                    <tr>  <td className='button-col'>Primary Skills:{exp.Primary_Skills}</td>
                      <td className='button-col'>Secondary Skills:{exp.Secondary_Skills}</td>
                      </tr></div>


                     })
                   }
                   </tbody>
       </table>
     }
       </div>
     )
  }
}
export default ViewJobInfo