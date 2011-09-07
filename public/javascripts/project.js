// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
	
  window.UserStory = Backbone.Model.extend({
    defaults: {
      card: 'As a <role> I can <action> in order to <value>'
    	  /*****,
      conversation: 'Further description, analysis and design, dev notes',
      confirmation: 'Acceptance Tests',
    	  *****/
    },
	url: '/userstories',
  });
  
  window.UserStoryList = Backbone.Collection.extend({
	model: window.UserStory,
	url: '/userstories',
  });
  
  window.UserStoryView = Backbone.View.extend({
	tagName: 'li',
	
    initialize: function(){
      _.bindAll(this, 'render');	
    },
	
    render: function(){
      $(this.el).html(this.model.get("card"));
      return this;
    }
  });
  
  window.ProjectView = Backbone.View.extend({
    el: $('#project-header'),
    
    events: {
      'click #add-user-story': 'addUserStory',
    },
    
    initialize: function(){
      this.userStoryList = new UserStoryList; 
      _.bindAll(this, 'render');
      this.userStoryList.bind("add", this.appendUserStory)
      this.render();
    },
    
    addUserStory: function() {
      //console.log('add');
      var card = $('#new-user-story-card').val();	
      var aUserStory = new UserStory({card: card});
      aUserStory.save();
      this.userStoryList.add(aUserStory);
    },
    
    appendUserStory: function(model) {
      var userStoryView = new UserStoryView({
        model: model
      });
      $("#user-story-list").append(userStoryView.render().el);
      //console.log('rendered in appendUserStory');
    },
    
    render: function(){
      $(".header").append("<h2>Project: ScrumStack");
    }
  });

  window.projectView = new ProjectView();
});