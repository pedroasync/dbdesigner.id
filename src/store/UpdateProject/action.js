import { message } from "ant-design-vue";
import UpdateProject from "../../request/updateProject.request";
import DeleteProject from "../../request/deleteProject.request";
import { request2, requestHelper } from "../../helper/RequestConnector";
export default {
  updateProject: request2(async context => {
    context.commit("setLoding", true);
    try {
      await requestHelper(UpdateProject, {
        id: context.rootState.diagram.projectDescription.id,
        title: context.state.title,
        description: context.state.description
      });
      message.success("Updated", 2);
      context.rootDispatch("diagram/loadProject", {
        id: context.rootState.diagram.projectDescription.id
      });
    } catch (error) {
      message.error("Your network problem", 2);
    }
    context.commit("setLoding", false);
  }),
  deleteProject: request2(async context => {
    context.rootCommit("GlobalLoading/setVisible", true);
    try {
      await requestHelper(DeleteProject, {
        id: context.rootState.diagram.projectDescription.id
      });
      message.success("Deleted", 2);
    } catch (error) {
      message.error("Your network problem", 2);
    }
    context.commit('setTitle',null)
    context.commit('setDescription',null)
    context.rootCommit('diagram/deletedData')
    context.rootCommit("GlobalLoading/setVisible", false);
  }),
};