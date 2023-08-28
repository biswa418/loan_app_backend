const mongoose = require('mongoose');
const { auditMiddleware } = require('../utils');

const loanStageSchema = new mongoose.Schema({
    status: String,
    sub_status: mongoose.Schema.Types.Mixed,
    remark: String,
    _id: false
});

const sponsorBankSchema = new mongoose.Schema({
    id: String,
    enach_id: String,
    accepted: Boolean,
    generated_at: Date,
    file_name: String,
    _id: false
}, { timestamps: true });

const ackReportSchema = new mongoose.Schema({
    id: String,
    umrn: String,
    message_id: String,
    original_message_id: String,
    enach_id: String,
    accepted: Boolean,
    generated_at: Date,
    file_name: String,
    _id: false
}, { timestamps: true });

const resReportSchema = new mongoose.Schema({
    id: String,
    umrn: String,
    message_id: String,
    original_message_id: String,
    enach_id: String,
    accepted: Boolean,
    generated_at: Date,
    file_name: String,
    dest_bank_name: String,
    dest_bank_id: String,
    _id: false
}, { timestamps: true });

const bankDetailsSchema = new mongoose.Schema({
    shared_with_bank: String,
    bank_name: String,
    shared_at: Date,
    authenticated_at: Date,
    sponsor_bank_report: [sponsorBankSchema],
    ack_report: [ackReportSchema],
    res_report: [resReportSchema],
    _id: false
});

const mandateSchema = new mongoose.Schema({
    file_name: String,
    customer_identifier: String,
    customer_name: String,
    customer_ref_number: String,
    auth_type: String,
    authentication_time: Date,
    is_recurring: Boolean,
    frequency: String,
    first_collection_date: Date,
    maximum_amount: Number,
    customer_account_number: String,
    customer_account_type: String,
    destination_bank_id: String,
    destination_bank_name: String,
    sponsor_bank_name: String,
    _id: false
});

const physicalNachSchema = new mongoose.Schema({
    id: String,
    mandate_id: String,
    state: String,
    type: String,
    bank_details: bankDetailsSchema,
    mandate_details: mandateSchema,
    umrn: String,
    mode: String,
    service_provider_details: {
        service_provider_name: String,
        service_provider_utility_code: String
    },
    _id: false,
    updateAt: Date,
    createdAt: Date
});

const otherOwnerSchema = new mongoose.Schema({
    name: String,
    category: String,
    fileLink: String,
    uploadStatus: Boolean,
    uploadedDateMS: mongoose.Schema.Types.Long,
    error: String,
    isApproved: Boolean,
    meta_page_document: Boolean,
    completed: String,
    page: String,
    uploadedFrom: String,
    rejectionReason: String,
    _id: false
});

const chequeSchema = new mongoose.Schema({
    name: String,
    category: String,
    fileLink: String,
    uploadStatus: Boolean,
    uploadedDateMS: mongoose.Schema.Types.Long,
    error: String,
    isApproved: Boolean,
    meta_page_document: Boolean,
    completed: String,
    page: String,
    uploadedFrom: String,
    cheque_number: String,
    account_number: Number,
    ifsc_code: String,
    _id: false
});

const customerSchema = new mongoose.Schema({
    name: String,
    category: String,
    fileLink: String,
    uploadStatus: Boolean,
    uploadedDateMS: mongoose.Schema.Types.Long,
    error: String,
    isApproved: Boolean,
    meta_page_document: Boolean,
    completed: String,
    page: String,
    uploadedFrom: String,
    location: {
        lat: Number,
        long: Number,
        imageLocation: Boolean
    },
    _id: false
});

const documentSchema = new mongoose.Schema({
    cheques: [chequeSchema],
    customer: [customerSchema],
    field_investigation: [],
    other_ownership_proof: [otherOwnerSchema],
    dual_form: [otherOwnerSchema],
    stamp_paper: [otherOwnerSchema],
    bank_passbook: [otherOwnerSchema],
    bsv: [otherOwnerSchema],
    form_22: [otherOwnerSchema],
    chassis_number: [otherOwnerSchema],
    sales_invoice: [otherOwnerSchema],
    insurance: [otherOwnerSchema],
    trc: [otherOwnerSchema],
    form_26_35: [otherOwnerSchema],
    erick_delivery_photo: [otherOwnerSchema],
    loan_agreement: [otherOwnerSchema],
    _id: false
});

const addressSchema = new mongoose.Schema({
    address: String,
    city: String,
    country: String,
    lat: Number,
    lon: Number,
    pincode: Number,
    state: String,
    _id: false
});

const detailsSchema = new mongoose.Schema({
    NTC_status: String,
    aadhaar_distance: Number,
    aadhaar_master_address: addressSchema,
    age: Number,
    age_status: String,
    crif_pull: String,
    crif_score: Number,
    crif_score_status: String,
    crif_status: String,
    current_distance: Number,
    current_master_address: addressSchema,
    distance_status: String,
    gender_status: String,
    information_extraction: String,
    master_address: addressSchema,
    mindistance_ownership_status: String,
    property_ownership_status: String,
    _id: false
});

const creditEngineSchema = new mongoose.Schema({
    details: detailsSchema,
    message: String,
    status: String,
    substatus: String,
    run_count: Number,
    _id: false
})

const referenceSchema = new mongoose.Schema({
    name: String,
    mobile_number: Number,
    relation_with_borrower: String,
    _id: false
});

const otherDetailsSchema = new mongoose.Schema({
    vehicle_model: String,
    battery_brand: String,
    battery_capacity: String,
    vehicle_price_on_road: Number,
    vehicle_price_ex_showroom: Number,
    loan_offer_accepted: Boolean,
    accessbility_till_premise: String,
    family: {
        family_members: Number,
        earning_members: Number,
        amount_earned: Number
    },
    field_investiagation_dateMS: mongoose.Schema.Types.Long,
    references: [referenceSchema],
    remarks: String,
    vehicle_chasis_no: String,
    vehicle_engine_no: String,
    sourced_by: String,
    _id: false
});

const esignSchema = new mongoose.Schema({
    generated: Boolean,
    signed: Boolean,
    _id: false
})

const physicalNaSchema = new mongoose.Schema({
    created: Boolean,
    generatedForm: Boolean,
    approved: Boolean,
    uploaded: Boolean,
    _id: false,
    createdAt: Date,
    updatedAt: Date
});

const appSchema = new mongoose.Schema({
    agent_code: String,
    customer_id: String,
    nbfc_id: String,
    anchor_id: String,
    nbfc_loan_id: String,
    oem_id: String,
    application_start_date: Date,
    business_id: String,
    bank_details_id: String,
    linked_banks: [String],
    origin: String,
    loan_type: String,
    loan_version: Number,
    esign_status: {
        customer: esignSchema,
        co_customer: esignSchema,
        document_id: String
    },
    loan_amount: Number,
    interest_amount: Number,
    processing_charge: Number,
    processing_charge_rate: Number,
    processing_fee_paid: Number,
    processing_fee_mode: String,
    subvention_amount: Number,
    hold_back_amount: Number,
    down_payment: Number,
    installment_amount: Number,
    discount_amount: Number,
    disbursed_amount: Number,
    total_repayment: Number,
    gst_amount: Number,
    is_disbursed: Boolean,
    disbursed_date: Date,
    rejection_date: Date,
    tenure_type: String,
    gps_charges: Number,
    tenure_value: Number,
    tranch_tenure_type: String,
    tranch_tenure_value: Number,
    no_installments: String,
    credit_limit: Number,
    principal_amount: Number,
    payment_basis: String,
    other_details: otherDetailsSchema,
    monthly_interest_rate: Number,
    annual_interest_rate: Number,
    embifi_approval_details: {
        status: Boolean,
        remark: String,
        embifi_user: String
    },
    nbfc_approval_details: {
        status: String,
        remark: String,
        nbfc_user: String,
        send_to_nbfc: Boolean,
        send_dateMS: mongoose.Schema.Types.Long
    },
    credit_engine: creditEngineSchema,
    is_nearest_property_owned: String,
    master_pincode: Number,
    master_city: String,
    master_state: String,
    credit_pull: {
        consent: String,
        consent_date: Date,
        credit_data: {
            crif_score: String,
        },
        crif_question: String,
        crif_data: {
            iv: String,
            encryptedData: String
        },
        crif_stage: String,
        next_runtimeMS: mongoose.Schema.Types.Long
    },
    loan_agreement_status: Boolean,
    loan_status: String,
    physical_nach_status: physicalNaSchema,
    enach_status: String,
    upi_autopay_data: String,
    upi_autopay_status: String,
    aadhaar_esign_status: String,
    interest_collection_type: String,
    other_charges: Number,
    icd_interest_details: {
        loan_amount: Number,
        icd_amount: Number,
        no_of_days: Number,
        icd_interest: Number
    },
    icd_transfers: {
        loan_amount: Number,
        icd_amount: Number,
        icd_transfer_amount: Number,
        icd_amount_used: Number,
        excess_amount_with_vani: Number
    },
    is_closed: Boolean,
    loan_stage_data: {
        pre_credit: loanStageSchema,
        customer_kyc: loanStageSchema,
        credit_check_1: loanStageSchema,
        co_customer_kyc: loanStageSchema,
        credit_check_2: loanStageSchema,
        loan_details: loanStageSchema,
        bank_details: loanStageSchema,
        nbfc_selection: loanStageSchema,
        loan_offer: loanStageSchema,
        pre_disbursement: loanStageSchema,
        sent_to_nbfc: loanStageSchema,
        nbfc_approval: loanStageSchema,
        disbursement: loanStageSchema,
        post_disbursement: loanStageSchema,
        collection: loanStageSchema,
    },
    application_id: { type: String, required: true, unique: true },
    creation_stage: String,
    documents: documentSchema,
    field_investigation_agent: {
        name: String,
        mobile_number: Number,
    },
    enach_data: String,
    physical_nach_data: physicalNachSchema,
    utr: String,
});

// attach the middleware to audit
appSchema.plugin(auditMiddleware);

const Application = mongoose.model('Application', appSchema);

module.exports = Application;
