const ROUTES = {
    GET_USERS: new URL('users', import.meta.env.VITE_BACKEND_URL),
    LOGIN: new URL('login', import.meta.env.VITE_BACKEND_URL),
    IMAGES: new URL('images/', import.meta.env.VITE_BACKEND_URL),
    GET_NEXT_REALISM_QUESTION: new URL(
        'next_realism_question/',
        import.meta.env.VITE_BACKEND_URL,
    ),
    POST_REALISM_ANSWER: new URL(
        'post_realism_answer/',
        import.meta.env.VITE_BACKEND_URL,
    ),
    GET_NEXT_CONDITIONALITY_QUESTION: new URL(
        'next_conditionality_question/',
        import.meta.env.VITE_BACKEND_URL,
    ),
    POST_CONDITIONALITY_ANSWER: new URL(
        'post_conditionality_answer/',
        import.meta.env.VITE_BACKEND_URL,
    ),
    GET_NEXT_MODEL_ASSESSMENT_QUESTION: new URL(
        'next_model_assessment_question/',
        import.meta.env.VITE_BACKEND_URL,
    ),
    POST_MA_IMAGES_QUESTION_ANSWER: new URL(
        'post_ma_images_answer/',
        import.meta.env.VITE_BACKEND_URL,
    ),
    POST_MA_QUESTIONNAIRE_ANSWER: new URL(
        'post_ma_questionnaire_answer/',
        import.meta.env.VITE_BACKEND_URL,
    ),
    POST_MA_QUESTIONNAIRE_BASELINE_ANSWER: new URL(
        'post_ma_questionnaire_baseline_answer/',
        import.meta.env.VITE_BACKEND_URL,
    ),
    POST_MA_NASA_TLX_ANSWER: new URL(
        'post_ma_nasa_tlx_answer/',
        import.meta.env.VITE_BACKEND_URL,
    ),
}

export default ROUTES;
