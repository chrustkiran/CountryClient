import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button, Row, Col, Layout, Alert,Table, Tag } from 'antd';
import {
  DeleteTwoTone,
    LoadingOutlined,
  } from '@ant-design/icons';

import CountryService from '../services/countryService';
import axios from 'axios';






class Main extends React.Component {
    
  
  constructor(props){
    super(props);
    const FIND_URL = process.env.REACT_APP_BASE_URL  + 'findAll';
    this.evtSource = new EventSource(FIND_URL);
  }


    state = {
        loading : false,
        error : false,
        deletePressed :false,
        file : "",
        data : []
    }

  
    columns = [{
      title: 'Zip Name',
      dataIndex: 'zipFileName',
      key: 'zipFileName',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Extracted Name',
      dataIndex: 'extractedFileName',
      key: 'extractedFileName',
    },
    {
      title: 'File Contnet',
      dataIndex: 'fileContent',
      key: 'fileContent',
    },
    {
      title: 'Country',
      dataIndex: 'countryName',
      key: 'countryName',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render : status => {
        let color = "red"
        if(status == "SUCCESS"){
          color = "green"
        }
        return (
          <Tag color={color} key={status} > {status} </Tag>
        )
      }
    },
    {
      title: 'Date',
      dataIndex : 'date',
      key: 'date',
      
    },
  ];
   
  




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

    fetch = () =>{
      this.evtSource.onmessage = e =>{
        console.log(JSON.parse(e.data));
      }
    }



     onFormSubmit = (e) =>{
      e.preventDefault();
      const formData = new FormData();
      formData.append('file',this.state.file);
      this.setState({loading : true});
      CountryService.process(formData).then( res =>
        {
            this.setState({loading : false});
        }
      );
   
  }
  onChange = (e) => {
      this.setState({file:e.target.files[0]});
  }


  componentDidMount(){
    this.evtSource.onmessage = e =>{
      this.setState({data :  [...this.state.data, JSON.parse(e.data)]});
      console.log(e.data);
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
 

      fetchCont = ()=>{
        
      }


      startEventSource() {
        this.eventSource = new EventSource(`https://countrytestapi.herokuapp.com/findAll`);
        this.eventSource.onmessage = e =>{
          this.setState({data :  [...this.state.data, JSON.parse(e.data)]});
          console.log(e.data);
        }

        
      }
    
  

  render() {


    //this.fetch();

    console.log('re-rendering');
    let table = <div></div>
    if(this.state.error == true){
      table = <Alert message="Sorry! something went wrong" type="error" />
    } else {
      table = <Table columns={this.columns} dataSource={this.state.data} />
    }

    return (
        <div >
           <form onSubmit={this.onFormSubmit}>
                <h1>Country Process</h1>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit">Process</button>
            </form>   <Button onClick={this.onDelete} style={{marginTop : '20px', marginRight: '2px'}} > <DeleteTwoTone twoToneColor="#eb2f96" /> </Button>
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