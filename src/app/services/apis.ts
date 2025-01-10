import { API_URL } from '../../environments/environment';

const BASE_URL : string = API_URL;

// ENDPOINTS
export const endpoints = {
    UPLOAD_DOC_API: BASE_URL + "pdf/upload",
    STORE_EMBEDDINGS_API: BASE_URL + "section/extract",
    EXPORT_SUMMARY_API: BASE_URL + "upload_feedback",
    DOWNLOAD_SUMMARY_CSV_API: BASE_URL + "download_feedback",
    CUSTOM_SUMMARY_API: BASE_URL + "custom_summarize",
    EMP_SUMMARIZED_API: BASE_URL + "get_summarized_feedback",
    GET_FEEDBACKS_API: BASE_URL + "get_feedback_data",
}
