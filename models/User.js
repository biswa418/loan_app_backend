const mongoose = require('mongoose');
const auditMiddleware = require('../utils');

const addressInformationSchema = new mongoose.Schema({
    address: String,
    pincode: Number,
    state: String,
    city: String,
    district: String,
    _id: false
});

const aadhaarDetailsSchema = new mongoose.Schema({
    verification_type: String,
    name: String,
    address: String,
    gender: String,
    id_number: String,
    address_information: addressInformationSchema,
    UID: String,
    age_band: String,
    masked_mobile_number: String,
    is_aadhaar_address_owned: Boolean,
    father_name: String,
    documents: mongoose.Schema.Types.Mixed,
    aadhaar_mobile_matched: Boolean,
    _id: false
});

const documentSchema = new mongoose.Schema({
    name: String,
    category: String,
    fileLink: String,
    uploadStatus: Boolean,
    uploadedDateMS: Number,
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

const userSchema = new mongoose.Schema({
    origin: String,
    onboarded_nbfc: String,
    onboarded_anchor: String,
    onboarded_application: String,
    country_code: String,
    gender: String,
    email_id: String,
    dob: String,
    is_corporate: Boolean,
    pan_details: {
        number: String,
        name: String,
        father_name: String,
        masked_aadhaar: String,
        pan_aadhaar_linked: Boolean,
        pan_aadhaar_matched: Boolean,
        dob: String,
        is_business: Boolean
    },
    corporate_pan_details: {
        number: String,
        name: String,
        linked_pans: []
    },
    residential_address: {
        is_aadhaar_address_same: Boolean,
        address: String,
        pincode: String,
        property_owned: Boolean,
        city: String,
        district: String,
        state: String,
    },
    permanent_address: {
        address: String,
        city: String,
        state: String,
        district: String,
        pincode: String,
    },
    aadhaar_details: aadhaarDetailsSchema,
    is_pan_uploaded: Boolean,
    kyc_approval_details: {
        status: Boolean,
        remarks: String,
        embifi_user: String,
    },
    other_details: {
        income: String,
        education: String,
        references: String,
        family: String,
        driving_license_number: String,
    },
    sms_verified: Boolean,
    creation_stage: String,
    onboarding_date: Date,
    customer_id: { type: String, required: true, unique: true },
    documents: {
        aadhaar_back: documentSchema,
        aadhaar_front: documentSchema,
        pan: documentSchema,
        customer_photo: [customerPhotoSchema],
    },
    mobile_number: Number,
}, {
    timestamps: true
});

// attach the middleware to audit
userSchema.plugin(auditMiddleware.auditMiddleware);


const User = mongoose.model('User', userSchema);
module.exports = User;