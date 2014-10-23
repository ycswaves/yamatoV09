UserProfiles = new Meteor.Collection("userProfiles");

var Schema = {};

Schema.Email = new SimpleSchema({
  address: {
    type: String,
    label: "Email address"
  },
  verified: {
    type: Boolean,
    label: "Verification status"
  }
});

Schema.UserProfile = new SimpleSchema({
  userid: {
    type: String,
    label: "user ID"
  },
  name: {
    type: String,
    label: "Full name",
    optional: true
  },
  avatar: {
    type: String,
    label: "avatar img link",
    optional: true
  },
  phone: {
    type: String,
    label: "contact number",
    regEx: /\d{8}/,
    optional: true
  },
  qq: {
    type: Number,
    label: "QQ号",
    optional: true
  },
  wechat: {
    type: String,
    label: "微信ID或号码",
    optional: true
  },
  email: {
    type: Schema.Email,
    label: "Email"
  },
  about: {
    type: String,
    label: "self description",
    optional: true
  }
});

UserProfiles.attachSchema(Schema.UserProfile);