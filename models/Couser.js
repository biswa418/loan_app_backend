const mongoose = require('mongoose');
const { auditMiddleware } = require('../utils');

const addressInformationSchema = new mongoose.Schema({
    address: String,
    pincode: String,
    state: String,
    city: String,
    district: String,
    _id: false
});

const panDetailsSchema = new mongoose.Schema({
    pan_type: String,
    number: String,
    name: String,
    father_name: String,
    masked_aadhaar: String,
    pan_aadhaar_linked: String,
    pan_aadhaar_matched: String,
    date_of_birth: String,
    _id: false
});

const aadhaarDetailsSchema = new mongoose.Schema({
    verification_type: String,
    is_aadhaar_address_owned: Boolean,
    name: String,
    address: String,
    gender: String,
    father_name: String,
    id_number: String,
    address_information: addressInformationSchema,
    UID: String,
    age_band: String,
    masked_mobile_number: String,
    aadhaar_mobile_matched: String,
    _id: false
});

const documentSchema = new mongoose.Schema({
    name: String,
    category: String,
    fileLink: String,
    uploadStatus: Boolean,
    uploadedDateMS: String,
    error: String,
    isApproved: Boolean,
    meta_page_document: Boolean,
    completed: String,
    page: String,
    uploadedFrom: String,
    rejectionReason: String,
    _id: false
});

const customerPhotoSchema = new mongoose.Schema({
    name: String,
    category: String,
    fileLink: String,
    uploadStatus: Boolean,
    uploadedDateMS: mongoose.Schema.Types.Mixed,
    error: String,
    isApproved: Boolean,
    meta_page_document: Boolean,
    completed: String,
    page: String,
    uploadedFrom: String,
    rejectionReason: String,
    _id: false
});

const creditEngineDetailsSchema = new mongoose.Schema({
    NTC_status: String,
    aadhaar_distance: Number,
    aadhaar_master_address: addressInformationSchema,
    age: Number,
    age_status: String,
    crif_pull: String,
    crif_score: String,
    crif_score_status: String,
    crif_status: String,
    current_distance: Number,
    current_master_address: addressInformationSchema,
    distance_status: String,
    information_extraction: String,
    mindistance_ownership_status: String,
    property_ownership_status: String,
    _id: false
});

const couserSchema = new mongoose.Schema({
    customer_id: String,
    application_id: String,
    origin: String,
    dob: String,
    onboarded_date: Date,
    pan_details: panDetailsSchema,
    country_code: String,
    gender: String,
    email_id: String,
    customer_type: String,
    residential_address: addressInformationSchema,
    property_owned: String,
    creation_stage: String,
    aadhaar_details: aadhaarDetailsSchema,
    relation_with_borrower: String,
    income: String,
    education: String,
    credit_engine: {
        details: creditEngineDetailsSchema,
        message: String,
        status: String,
        substatus: String,
        run_count: Number,
    },
    is_nearest_property_owned: Boolean,
    credit_pull: {
        consent: Boolean,
        consent_date: Date,
        credit_data: {
            crif_score: String,
        },
        crif_question: String,
        crif_data: {
            iv: String,
            encryptedData: String,
        },
        crif_stage: String,
        next_runtimeMS: Number,
    },
    documents: {
        aadhaar_front: documentSchema,
        aadhaar_back: documentSchema,
        pan: documentSchema,
        co_customer_photo: [customerPhotoSchema],
        co_customer_ownership_proof: [customerPhotoSchema],
    },
    mobile_number: String,
    other_details: {
        remark: String,
    },
});

// attach the middleware to audit
couserSchema.plugin(auditMiddleware);

const Couser = mongoose.model('Couser', couserSchema);

module.exports = Couser;
