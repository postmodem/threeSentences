var columnTemplate,
    cueTemplate,
    sentenceTemplate,
    currentSentenceContent;

var templateDefaults = {
  cue: {
    parent_id: '',
    cue: ''
  }
  // sentence: {
  //   sentence_id: '',

  // }
};

function updateCue(sentence) {
  var cue = $('.cue[data-parent-id=' + sentence.id + ']');
  cue.html(sentence.content);
}

var initializeTemplates = function() {
  columnTemplate = _.template($('#column-template').html());
  cueTemplate = _.template($('#cue-template').html());
  sentenceTemplate = _.template($('#sentence-template').html());
};

var calculateStartPosition = function(depth) {
  var position = 0;
  while (depth > 0) {
    position += Math.pow(3, depth - 1);
    depth--;
  }
  return position;
};

var calculateEndPosition = function(depth) {
  var position = 0;
  while (depth > 1) {
    position += Math.pow(3, depth);
    depth--;
  }
  return position;
};

var parentId = function(position) {
  return Math.ceil(position / 3) - 1;
};

var buildColumn = function(depth) {
  var column = columnTemplate({depth: depth});
  var startPos = calculateStartPosition(depth);
  var endPos = calculateEndPosition(depth);
  var range = _.range(startPos, endPos);
  _.each(range, function(element, index, list) {
    if ((index - 1) % 3 === 0) {
      column += cueTemplate(templateDefaults.cue);
    }
    column += sentenceTemplate({
      sentence_id: '',
      position: element,
      depth: depth,
      parent_id: parentId(element)
    });
  });
  var close = "</div>";
  $('.slidee').append(column);
};

var findOrInitializeColumn = function(depth) {
  var column;
  if ($('.column[data-depth=' + depth + ']').length === 0) {
    buildColumn(depth);
  }
  return $('.column[data-depth=' + depth + ']');
};

var initializeSentences = function() {
  if (sentencesJson.length > 0) {
    sentencesJson.forEach(buildSentence);
  }
};

// ----- SENTENCE MODEL ------

story.sentences = [];

var Sentence = function(sentenceJson) {
  this.id = sentenceJson.id;
  this.position = sentenceJson.position;
  this.parentId = sentenceJson.parent_id;
  this.content = sentenceJson.content;
  this.depth = sentenceJson.depth;
  this.$el = null;
};

Sentence.prototype.save = function() {
  var sentence = this;
  var sentenceParams = {
    sentence: {
      position: sentence.position,
      depth: sentence.depth,
      parent_id: sentence.parentId,
      content: sentence.content
    }
  };

  $.ajax({
    url: '/stories/' + story.id + '/sentences',
    method: 'POST',
    data: JSON.stringify(sentenceParams),
    dataType: 'json',
    contentType: 'application/json'
  }).done(function(data){
    console.log(data);
    sentence.id(data.id);
    findOrInitializeColumn(sentence.depth + 1);
  }).error(function(data){
    console.log(data);
  });
};

Sentence.prototype.update = function() {
  var sentence = this;
  var sentenceParams = {
    sentence: {
      id: sentence.id,
      position: sentence.position,
      depth: sentence.depth,
      parent_id: sentence.parentId,
      content: sentence.content
    }
  };
  $.ajax({
    url: '/stories/' + story.id + '/sentences/' + sentence.id,
    method: 'PUT',
    data: JSON.stringify(sentenceParams),
    dataType: 'json',
    contentType: 'application/json'
  }).done(function(data){
    updateCue(sentence);
    sentence.updateElement();
    console.log(sentence);
  }).error(function(data){
    console.log(data);
  });
};

Sentence.prototype.render = function() {
  var column; //, cluster;
  if (this.depth === 0){
    column = $('.column[data-depth=0]');
    // cluster = $('.cluster[data-depth=0]');
  } else {
    column = findOrInitializeColumn(this.depth);
    // cluster = findOrInitializeCluster(this);
  }
  this.$el = column.find('.sentence[data-position=' + this.position + ']');
  this.updateElement();
};

Sentence.prototype.updateElement = function() {
  this.$el.attr('data-id', this.id);
  // this.$el.attr('data-parent-id', this.parentId);
  this.$el.val(this.content);
};

// ---------------------------------------------

var buildSentence = function(sentenceJson) {
  var sentence = new Sentence(sentenceJson);
  story.sentences.push(sentence);
  sentence.render();
};


$(document).ready(function(){
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  initializeTemplates();

  initializeSentences();

  $('body').on('focus', 'input.sentence', function(e){
    e.preventDefault();
    currentSentenceContent = $(this).val();
  });

  $('body').on('blur', 'input.sentence', function(e) {
    e.preventDefault();

    // if ($(this).val() !== currentSentence) {
    //   var $sentence = $(this);
    //   var depth = $sentence.attr('data-depth');
    //   if ($sentence.attr('data-id')) {
    //     update($sentence);
    //   } else {
    //     create($sentence);
    //   }
    // }
  });
});