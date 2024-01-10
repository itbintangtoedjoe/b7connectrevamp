import axios from 'axios';

export async function GetPendingTaskCAM(username) {
  const response = await axios.get(
    `https://portal.bintang7.com/masterapprovalgeneral/list/getpendingtask?username=${username}`,
  );
  console.log(JSON.stringify(response, null, 2));
}
