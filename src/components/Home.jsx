import { useContext, useState,useEffect } from 'react';

import { Box } from '@mui/material';
import { makeStyles } from "@mui/styles";

import { DataContext } from '../context/DataProvider';
import { checkParams, getAllRequests } from '../utils/common-utils';
import { getData } from '../service/api';

//components
import Form from "./Form";
import SelectTab from './SelectTab';
import SnackBar from './SnackBar';
import Header from './Header';
import Response from './Response';
import ErrorScreen from './ErrorScreen';
import RequestList from './RequestList';

const useStyles = makeStyles({
    main:{
        display:'flex',
        justifyContent:'center'
    },
    component: {
        width: '60%',
        margin: '20px auto 0 auto'
    }
})

const Home = () => {
    const classes = useStyles();
    
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [errorResponse, setErrorResponse] = useState(false);
    const [apiResponse, setApiResponse] = useState({})
    const [isReqPresent, setIsReqPresent] = useState(true)
    const [allRequests, setAllRequests] = useState(getAllRequests())

    const { setFormData, formData, jsonText, paramData, headerData, /* allRequests,setAllRequests */ } = useContext(DataContext);

    useEffect(()=>{
        let ReqPresent = localStorage.getItem('current-request')
        if(!ReqPresent){
            setIsReqPresent(false)
        }else setIsReqPresent(true)
    },[apiResponse])
    

    const onSendClick = async () => {
        setErrorResponse(false)
        if(!checkParams(formData, jsonText, paramData, headerData, setErrorMsg)) {
            setError(true);
            return false;
        }
// console.log(formData, jsonText, paramData, headerData)
        let response = await getData(formData, jsonText, paramData, headerData);
        console.log(response);
        if (response === 'error') {
            setErrorResponse(true);
            return;
        }
        setApiResponse(response.data)
        if(!isReqPresent){
            
        localStorage.setItem('current-request', JSON.stringify(formData))
    }
        // localStorage.setItem('all-requests', JSON.stringify([...allRequests, formData]))
        // setAllRequests([...allRequests, formData])

        
    }
console.log('allrequests',allRequests)
    return (
            <>
            <Header />
        <div className={classes.main}>
            <RequestList allRequests={allRequests} formData={formData} setFormData={setFormData} />
            <Box className={classes.component}>
                <Form onSendClick={onSendClick} isReqPresent={isReqPresent} setApiResponse={setApiResponse}/>
                <SelectTab />
                { errorResponse ? <ErrorScreen /> : <Response data={apiResponse} /> }
            </Box>
            { error && <SnackBar errorMsg={errorMsg} error={error} setError={setError} /> }
        </div>
            </>
    )
}

export default Home;