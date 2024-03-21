import axios from 'axios';
import {Buffer} from 'buffer';

const monthNameToNumber = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export async function GetPendingTaskCAM(username, keyword) {
  const response = await axios.get(
    `https://portal.bintang7.com/masterapproval/list/getpendingtask?username=${username}`,
  );

  const dataWithDateObjects = response.data.map((item, index) => {
    const dateString = item.TRANSACTIONDATE; // replace with the actual property name
    const dateParts = dateString.split(' ');
    const monthNumber = monthNameToNumber[dateParts[1]];
    const year = parseInt(dateParts[2], 10);
    const date = new Date(
      year,
      monthNumber,
      parseInt(dateParts[0], 10),
    ).toISOString();

    return {
      ...item,
      date,
      index,
    };
  });

  return dataWithDateObjects;
}

export async function GetSearchPendingTaskCam(data, keyword) {
  const filteredResponse = data.filter(
    item =>
      (item.IDTRANSC &&
        item.IDTRANSC.toLowerCase().includes(keyword.toLowerCase())) ||
      (item.REQUESTOR &&
        item.REQUESTOR.toLowerCase().includes(keyword.toLowerCase())) ||
      (item.REMARKS &&
        item.REMARKS.toLowerCase().includes(keyword.toLowerCase())),
  );

  const dataWithDateObjects = filteredResponse.map((item, index) => {
    const dateString = item.TRANSACTIONDATE; // replace with the actual property name
    const dateParts = dateString.split(' ');
    const monthNumber = monthNameToNumber[dateParts[1]];
    const year = parseInt(dateParts[2], 10);
    const date = new Date(
      year,
      monthNumber,
      parseInt(dateParts[0], 10),
    ).toISOString();

    return {
      ...item,
      date,
      index,
    };
  });

  return dataWithDateObjects;
}

async function SendCAMLogActivity(action, logData) {
  const sendLogData = {
    TransactionID: logData.transactionID,
    ModulID: logData.modulID,
    AppID: logData.appsID,
    ActionType: action,
    Remarks:
      action == 'Rejection' ? logData.rejectReason : logData.reviseReason,
    UserID: logData.username,
  };
  try {
    await axios.post(
      'https://portal.bintang7.com/tara/b7connect/cam/send-log-activity',
      sendLogData,
    );
  } catch (error) {
    console.error('Error sending log activity:', error);
    throw error;
  }
}

export async function ApproveTransactionCAM(data) {
  try {
    const result = await axios.post(
      'https://portal.bintang7.com/masterapproval/api/approve',
      data,
    );

    await SendCAMLogActivity('Approval', data);
    return result.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function RejectTransactionCAM(data) {
  try {
    const result = await axios.post(
      'https://portal.bintang7.com/masterapproval/api/reject',
      data,
    );

    await SendCAMLogActivity('Rejection', data);
    return result.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function ReviseTransactionCAM(data) {
  try {
    const result = await axios.post(
      'https://portal.bintang7.com/masterapproval/api/revise',
      data,
    );

    await SendCAMLogActivity('Revision', data);
    return result.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function GetCAMAttachmentUrls(docNum, authCred) {
  const response = await axios.get(
    'https://webportal.bintang7.com/k2attachment/GetK2Attachment?documentNo=' +
      docNum,
    {
      headers: {
        Authorization: authCred,
      },
    },
  );
  return response.data;
}
