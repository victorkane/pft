// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
	
  window.UserStory = Backbone.Model.extend({
    defaults: {
      card: 'As a <role> I can <action> in order to <value>'
    	  /*****,
      conversation: 'Further description, analysis and design, dev notes',
      confirmation: 'Acceptance Tests',
    	  *****/
    }
  });
  
  window.UserStoryList = Backbone.Collection.extend({
	//model: UserStory
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
      this.userStoryList.add(aUserStory);
    },
    
    appendUserStory: function(model) {
      $("#user-story-list").append("<li>" + model.get("card") + "</li>");
      //console.log('rendered in appendUserStory');
    },
    
    render: function(){
      $(".header").append("<h2>Project: ScrumStack");
    }
  });

  window.projectView = new ProjectView();
});