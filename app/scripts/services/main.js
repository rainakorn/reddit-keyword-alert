'use strict';

angular.module('rkaServices')

.factory('Reddit', ['$resource', function($resource) {
  return $resource('http://www.reddit.com/r/:subreddit/:type.json');
}])

.service('UserData', function() {
  function Feed(sr, type, cfg) {
    this.sr = sr;
    this.type = type || 'new';

    cfg = cfg || {};
    this.expanded = (cfg.expanded !== undefined) ? cfg.expanded : true;
    this.optionsShown = (cfg.optionsShown !== undefined) ? cfg.optionsShown : false;
    this.numCommentsShown = (cfg.numCommentsShown !== undefined) ? cfg.numCommentsShown : false;

    this.toggleExpanded = function() {
      if (this.expanded) {
        this.optionsShown = false;
      }
      this.expanded = !this.expanded;
    };

    this.toggleOptionsShown = function() {
      this.optionsShown = !this.optionsShown;
    };
  }

  this.feeds = [
    new Feed('adoptMyVillager', 'new', {
      expanded: false,
      optionsShown: false,
      numCommentsShown: true
    }),
    new Feed('nba', 'hot')
  ];

  this.feeds.isEmpty = function() {
    return this.length === 0;
  };

  this.feeds.addFeed = function(sr, type, cfg) {
    if (sr.length === 0) {
      console.log('FEED NOT ADDED: No name specified.');
      return;
    }

    var feedExists = this.filter(function(feed) {
      return feed.sr === sr;
    }).length !== 0;
    if (feedExists) {
      console.log('FEED NOT ADDED: Feed already exists.');
      return;
    }
    
    this.push(new Feed(sr, type, cfg));
  };

  this.feeds.deleteFeed = function(feed) {
    this.splice(this.indexOf(feed), 1);
  };
});