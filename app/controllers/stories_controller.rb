class StoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @stories = current_user.stories.all
  end

  def show
    @story = Story.find(params[:id])
    @sentence = Sentence.new
    @user = current_user
    unless current_user == @story.user
      return redirect_to new_user_session_path
    end
  end

  def new
    @story = current_user.stories.new
  end

  def create
    @story = current_user.stories.new(story_params)
    if @story.save
      redirect_to @story
    else
      render :new
    end
  end

  def destroy
    @story = current_user.stories.find(params[:id])
    @story.destroy
    redirect_to root_path
  end

  def test
    @story = Story.find(params[:id])
    @sentence = Sentence.new
    @user = current_user
    unless current_user == @story.user
      return redirect_to new_user_session_path
    end
  end

  def export
    cookies['fileDownload'] = 'true'
    @story = Story.find(params[:id])
    depth = params[:Column].to_i - 1
    test = @story.export_story(depth, params[:filetype])
    render json: { url: test }.to_json
  end

  def download
    file = File.open('tmp/export.rtf', 'r')
    send_file file,
        :type => 'text/richtext; charset=UTF-8;',
        :disposition => "attachment; filename=export.rtf"
  end
  private

  def story_params
    params.require(:story).permit(:name, :Column, :filetype)
  end
end
