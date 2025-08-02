import { SHOW_SNACKBAR } from "../store/actions";

export const handleCatchBlock = (err, navigate, dispatch) => {



   if (!err.status || err.status == undefined) {

      dispatch({
         type: SHOW_SNACKBAR,
         payload: {
            message: err.message,
            severity: 'error'
         }

      })
      if (err.message === 'Network Error') {
         navigate(`/message/message/${encodeURIComponent(err.message)}`);
      }
   }
   else {

      const status = err.status;
      let errorMessage = err.response.data.message || err.message || "Something went wrong with API";

      switch (status) {


         case 409:
            dispatch({
               type: SHOW_SNACKBAR,
               payload: {
                  message: errorMessage,
                  severity: 'error'
               }

            })

            break;

         case 401:
            dispatch({
               type: SHOW_SNACKBAR,
               payload: {
                  message: errorMessage,
                  severity: 'error'
               }

            })
            break;

         case 500:
            dispatch({
               type: SHOW_SNACKBAR,
               payload: {
                  message: errorMessage,
                  severity: 'error'
               }

            })
            navigate(`/message/server-error/${encodeURIComponent(errorMessage)}`);
            break;

         default:
            dispatch({
               type: SHOW_SNACKBAR,
               payload: {
                  message: errorMessage,
                  severity: 'error'
               }

            })
            navigate(`/message/message/${status}:${encodeURIComponent(errorMessage)}`);
            break;
      }


   }



};
