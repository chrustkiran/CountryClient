import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Row, Col, Layout, Alert } from 'antd';
import {
  DeleteTwoTone,
    LoadingOutlined,
  } from '@ant-design/icons';
import DataTable from './dataTable';
import CountryService from '../services/countryService';



class Main extends React.Component {
      

    state = {
        loading : false,
        error : false,
        deletePressed :false,
    }

    onSubmitProcess = (zipname)=>{
      if(this.state.loading == false){
      this.setState({loading : true})
        console.log(zipname);
        CountryService.process(zipname).then(res => {
          this.setState({loading : false})
          console.log('response ', res);
            if(res.message == "Processed"){
              this.setState({error : false})
            } else {
            this.setState({error : true})
            }
        })
      }   
    }

    onDelete = () => {
      this.setState({deletePressed : true});
      CountryService.delteAll().then(res => {
        this.setState({deletePressed : false});
        console.log('delete', this.state.deletePressed)
      });
    }
    onFinish = values => {
        console.log('Received values of form: ', values);
      };
 

  

  render() {
    console.log('reee rendering');
    const { Search } = Input;
    let table = <div></div>
    if(this.state.error == true){
      table = <Alert message="Error! Maybe there is no such file." type="error" />
    } else {
      table = <DataTable></DataTable>
    }

    return (
        <div >
        <Search style={{padding : '20px',width : '40%'}}
        placeholder="input file name"
        enterButton="Process"
        size="medium"
        onSearch={value => this.onSubmitProcess(value)}
      />
      <Button onClick={this.onDelete} style={{marginTop : '20px', marginRight: '2px'}} > <DeleteTwoTone twoToneColor="#eb2f96" /> </Button>
    <div style = {{marginTop : '20px'}}>
        <br></br>
      
      {this.state.loading == true 
        ? <LoadingOutlined style={{ fontSize: '48px',color: '#08c'}} /> 
        : table}
    
    </div>
      </div>

    )
  }
}

export default Main;