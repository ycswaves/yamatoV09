var imageStore = new FS.Store.S3("property-images", { //todo: update 'image' to 'property-image'
  region: "ap-southeast-1",
  bucket: "yamato-image", //required
  ACL: "public-read", //optional, default is 'private', but you can allow public or secure access routed through your app URL
  // // The rest are generic store options supported by all storage adapters
  transformWrite: function(fileObj, readStream, writeStream){
    gm(readStream)
      .stroke("#fff")
      .strokeWidth(2)
      .fontSize(18)
      .drawText(15, 20, "www.yiho.me ")
      .stream(function (err, stdout, stderr) {
        if(err){
          console.log(err);
        }
        stdout.pipe(writeStream);
      });
  },
  // transformRead: myTransformReadFunction, //optional
  maxTries: 1 //optional, default 5
});

PropertyImages = new FS.Collection("property-images", { //todo: update 'image' to 'property-image'
  stores: [imageStore],
  filter: {
    allow: {
      contentTypes: ['image/*'], //allow only images in this FS.Collection
      extensions: ['jpeg','jpg','png','JPEG','JPG','PNG']
    },
    onInvalid: function (message) {
      if (Meteor.isClient) {
        swal('', '图片格式不对，上传失败.', 'error');
      } else {
        //console.log(message);
      }
    }
  }
});


PropertyImages.allow({
  insert: function(userId) {
    return !!userId;
  },
  update: function(userId) {
    return !!userId;
  }
  // remove: function(userId) {
  //   return !!userId;
  // },
  // download: function(userId) {
  //   return true;
  // },
  // fetch: []
});