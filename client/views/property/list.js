Template.propertyListing.rendered = function() {
  render();
}

Template.propertyListing.events({
  'click li.pageLink': function(){
    window.scrollTo(0, 0);
  }
});

ListController = RouteController.extend({
  template: 'propertyListing',
  waitOn: function () {
    return Meteor.subscribe("properties");
  },

  action: function () {
    if (this.ready()){
      this.render();
    } else{
      this.render('loading');
    }
  },
  data: function () {
    var params = this.params
      , pageLimit = 8
      , pageNum = 1;

    if(params.page && CommonHelper.isInteger(params.page)){
      pageNum = params.page;
    }

    var filter = {}
      , queryArr = []; // to pass in footer later

    for(var key in params){
      console.log(key, params[key]);
      if(key == 'page' || !params[key]) continue;

      switch(key){
        case 'price':
          filter[key] = {$gte: parseInt(params[key], 10)};
          break;

        case 'mrtLines':
          if(!params['mrt']){
            filter['mrt'] = new RegExp(params[key]);
          }
          break;

        default:
          filter[key] = params[key];
          break;
      }
      queryArr.push(key+'='+params[key]); //later revert the query back to string
    }

    var totalDocs = Properties.find(filter).count() //filter apply here too
      , totalPages = Math.ceil(totalDocs / pageLimit)
      , paginatedDocs = Properties.find(
          filter,
          {sort: {createdAt: -1}, skip: (pageNum-1)*pageLimit, limit: pageLimit}
        );


    // if(pageNum > totalPages){ //TODO: sometimes flash 'not found' even though have data
    //   this.render('notFound');
    //   return;
    // }

    return {
      properties: paginatedDocs,
      totalDocs: totalDocs,
      paginationConfig: {
        'config': {
          pageNum: pageNum,
          pageLimit: pageLimit,
          windowSize: 5, // asa # of pages displayed in the pagination must be odd number
          totalDocs: totalDocs,
          routeName: 'properties',
          query: queryArr.join('&')
        }
      }
    }
  }
});
