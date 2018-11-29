import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Remarkable from "remarkable";
import {
  operateArticle,
  getArticleDetail,
  getCategoryList,
  getTagList
} from "../../redux/action/articleAction";
import {
  Form,
  Input,
  Button,
  Tag,
  AutoComplete,
  Upload,
  Icon,
  Modal,
  message,
  Switch
} from "antd";
import BreadcrumbCustom from "../../component/BreadcrumbCustom";
import "../../style/markDown.css";
const imgHost = 'http://image.zhuweipeng.top/';
const FormItem = Form.Item;
const { TextArea } = Input;
const md = new Remarkable();

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      category: {
        data: [],
        inputVisible: false
      },
      tag: {
        data: [],
        inputVisible: false
      },
      inputValue: "",
      fileList: [],
      previewVisible: false,
      previewImage: "",
      textAreaValue: ""
    };
  }

  /*
   * 初始化
   */
  componentDidMount() {
    const { actions, location, form } = this.props;
    let id = location.query.id;

    actions.getCategoryList();
    actions.getTagList();

    // id获取文章数据
    if (id) {
      actions.getArticleDetail({ _id: id, type: "edit" }, data => {
				let fileList = [];

        // 遍历图片
        for (let item of data.images_src) {
          fileList.push({
            uid: data._id,
            name: item,
            status: "done",
            url: imgHost + item
          });
        }

        // 设置文章数据
        this.setState({
          _id: id,
          category: {
            data: data.categories,
            inputVisible: false
          },
          tag: {
            data: data.tags,
            inputVisible: false
          },
          textAreaValue: data.content,
          fileList
        });

        form.setFieldsValue({
          title: data.title,
          describe: data.describe,
          release: data.release
        });
      });
    }
  }

  /*
   * 删除标签
   * @data {removedData} 	标签名字
   * @data {type} 		标签类型 category: ‘分类’  tag: '标签'
   */
  handleClose = (removedData, type) => {
    let data = this.state;
    data[type].data = this.state[type].data.filter(
      data => data !== removedData
    );
    this.setState(data);
  };

  /*
   * 显示的对应输入框
   * @data {type} 		标签类型 category: ‘分类’  tag: '标签'
   */
  showInput = type => {
    let data = {};
    data[type] = Object.assign(this.state[type], { inputVisible: true });

    this.setState(data, () => {
      this[type + "Input"].focus();
    });
  };

  /*
   * 侦听输入框变化
   * @data {value} 		输入框内容
   */
  handleInputChange = value => {
    this.setState({ inputValue: value });
  };

  /*
   * 添加标签
   * @data {type} 		标签类型 category: ‘分类’  tag: '标签'
   */
  handleInputConfirm = type => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = {};
    tags[type] = state[type];

    if (inputValue && state[type].data.indexOf(inputValue) === -1) {
      tags[type].data = [...state[type].data, inputValue];
    }

    tags[type].inputVisible = false;

    this.setState(
      Object.assign(tags, {
        inputValue: ""
      })
    );
  };

  /*
   * 定义input ref
   * @data {type} 		标签类型 category: ‘分类’  tag: '标签'
   * @data {input} 		输入框DOM
   */
  saveInputRef = (type, input) => (this[type + "Input"] = input);

  /*
   * 点击文件链接或预览图标时的回调
   * @data {file} 		文件
   */
  handleUploadPreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  /*
   * 上传文件改变时的状态
   * @data {fileList} 	上传文件列表
   */
  handleUploadChange = ({ fileList }) => {
    if (fileList[fileList.length - 1]) {
      let status = fileList[fileList.length - 1].status;

      if (status === "error") {
        fileList.pop();
        message.error("图片上传失败");
      }
    }

    this.setState({ fileList });
  };

  /*
   * 对话框取消回调
   */
  handleUploadCancel = () => this.setState({ previewVisible: false });

  /*
   * 侦听多行文本框变化
   */
  onChangeTextAreaValue = e => this.setState({ textAreaValue: e.target.value });

  /*
   * markDown 显示更新
   */
  getRawMarkup = value => {
    return {
      __html: md.render(value)
    };
  };

  render() {
    const { handleSubmit, form, categoryList, tagList } = this.props;
    const getFieldDecorator = form.getFieldDecorator;
    const formItemLayout = {
      labelCol: { sm: { span: 3 }, xs: { span: 6 } },
      wrapperCol: { sm: { span: 20 }, xs: { span: 18 } }
    };
    const {
      category,
      tag,
      inputValue,
      fileList,
      previewVisible,
      previewImage,
      textAreaValue
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="clear" style={{ overflow: "auto" }}>
        <BreadcrumbCustom
          breadcrumb={[
            {
              path: "/article/list",
              breadcrumbName: "文章列表"
            },
            {
              path: "/article/edit",
              breadcrumbName: this.props.location.search ? "编辑" : "新增"
            }
          ]}
        />
        <div className="editContent clear">
          <Form
            className="form"
            onSubmit={handleSubmit.bind(this, form, this.state)}
          >
            <FormItem hasFeedback {...formItemLayout} label="标题">
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "标题不能为空！" }]
              })(<Input placeholder="请输入标题" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="发布">
              {getFieldDecorator("release", { valuePropName: "checked" })(
                <Switch />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="分类">
              <div className="category">
                {category.data.map(category => {
                  const tagElem = (
                    <Tag
                      key={category}
                      closable={true}
                      afterClose={() => this.handleClose(category, "category")}
                    >
                      {category}
                    </Tag>
                  );
                  return tagElem;
                })}
                {category.inputVisible && (
                  <AutoComplete
                    dataSource={categoryList}
                    style={{ width: 100 }}
                    placeholder="New Category"
                    filterOption={(inputValue, option) =>
                      option.props.children
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onChange={this.handleInputChange}
                  >
                    <Input
                      ref={this.saveInputRef.bind(this, "category")}
                      type="text"
                      value={inputValue}
                      onBlur={() => this.handleInputConfirm("category")}
                      onPressEnter={() => this.handleInputConfirm("categorys")}
                    />
                  </AutoComplete>
                )}
                {!category.inputVisible && (
                  <Button
                    size="small"
                    type="dashed"
                    onClick={() => this.showInput("category")}
                  >
                    + New Category
                  </Button>
                )}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="标签">
              <div className="tags">
                {tag.data.map(tag => {
                  const tagElem = (
                    <Tag
                      key={tag}
                      closable={true}
                      afterClose={() => this.handleClose(tag, "tag")}
                    >
                      {tag}
                    </Tag>
                  );
                  return tagElem;
                })}
                {tag.inputVisible && (
                  <AutoComplete
                    dataSource={tagList}
                    style={{ width: 100 }}
                    placeholder="New Tag"
                    filterOption={(inputValue, option) =>
                      option.props.children
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onChange={this.handleInputChange}
                  >
                    <Input
                      ref={this.saveInputRef.bind(this, "tag")}
                      type="text"
                      value={inputValue}
                      onBlur={() => this.handleInputConfirm("tag")}
                      onPressEnter={() => this.handleInputConfirm("tag")}
                    />
                  </AutoComplete>
                )}
                {!tag.inputVisible && (
                  <Button
                    size="small"
                    type="dashed"
                    onClick={() => this.showInput("tag")}
                  >
                    + New Tag
                  </Button>
                )}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="图片">
              <Upload
                accept="image/*"
                action="http://api.zhuweipeng.me/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handleUploadPreview}
                onChange={this.handleUploadChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                closable={false}
                footer={null}
                onCancel={this.handleUploadCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </FormItem>
            <FormItem hasFeedback {...formItemLayout} label="描述">
              {getFieldDecorator("describe", {
                rules: [{ required: true, message: "描述不能为空！" }]
              })(<Input placeholder="请输入文章描述" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="内容">
              <TextArea
                autosize={{ minRows: 15, maxRows: 20 }}
                value={textAreaValue}
                onChange={this.onChangeTextAreaValue}
              />
            </FormItem>
            <FormItem style={{ textAlign: "center" }}>
              <Button offset={8} type="primary" htmlType="submit">
                提交
              </Button>
            </FormItem>
          </Form>
          <div
            id="markDown"
            className="form"
            dangerouslySetInnerHTML={this.getRawMarkup(textAreaValue)}
          />
        </div>
      </div>
    );
  }
}

const EditForm = Form.create()(Edit);

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
  const { categoryList, tagList } = state;

  return {
    categoryList,
    tagList
  };
};

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => {
  let actions = bindActionCreators(
    { operateArticle, getArticleDetail, getCategoryList, getTagList },
    dispatch
  );

  return {
    // 提交update
    handleSubmit: (form, state, e) => {
      let param = {
        categories: state.category.data,
        tags: state.tag.data,
        images_src: state.fileList.map(item => item.name),
        content: state.textAreaValue,
        type: state._id ? "update" : "save"
      };

      if (state._id) param._id = state._id;

      e.preventDefault();
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          param.title = values.title;
          param.describe = values.describe;
          param.release = values.release;
          // 数据验证
          for (let i in param) {
            if (i !== "images_src") {
              switch (typeof param[i]) {
                case "object":
                  if (param[i].length <= 0) {
                    message.warning(i + "不能为空");
                    return;
                  }
                  break;
                case "string":
                  if (!param[i]) {
                    message.warning(i + "不能为空");
                    return;
                  }
                  break;
                default:
                  break;
              }
            }
          }

          actions.operateArticle(param);
        }
      });
    },
    actions
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm);
