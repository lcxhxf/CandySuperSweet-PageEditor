import React, { useMemo, useRef, useState } from 'react';
import { Menu, Radio, RadioChangeEvent } from 'antd';
import { PlusOutlined, SettingOutlined, ProfileOutlined, SolutionOutlined } from '@ant-design/icons';
import './assets/configs.less'
import './assets/App.less';
import './assets/multiCover.less';
import 'antd/dist/antd.css';
import { LeggoConfigs } from './application/Home';
import { TSchemaModel } from './type/interface';
import { RenderForm } from './application/RenderForm';


export default function App() {
  const modelList = useRef<{ [key: string]: TSchemaModel }>({})
  const [menuKey, setMenuKey] = useState(['configs'])
  const [selectedModel, setSelectedModel] = useState(null)
  const [count, setForceRender] = useState(0)
  const modelListEntries = useMemo(() => Object.entries(modelList.current), [count])

  const postSchemaModelData = (schemaModel: TSchemaModel) => {
    const modelName = schemaModel.name
    modelList.current[modelName] = JSON.parse(JSON.stringify(schemaModel))
    setForceRender(pre => pre + 1)
  }

  const content = useMemo(() => {
    switch (menuKey[0]) {
      case 'configs':
        return <LeggoConfigs onGetSchemaModel={postSchemaModelData} />
      case 'readme':
        return <iframe style={{ border: 'none' }} width="100%" height="100%" src="../README.html" />
      default:
        return <RenderForm schemaModel={selectedModel} />
    }
  }, [menuKey])

  return (
    <div className="App">
      <div className="header">
        <div className="slogan" style={{ "color": "pink", "fontSize": "40px", "margin": "0 auto", "fontWeight": "bold" }}>开启你的甜蜜页面</div>
        <Menu className="app_memu" onSelect={({ key }) => setMenuKey([key])} defaultSelectedKeys={['configs']} mode="horizontal">
          <Menu.Item  key="configs" icon={<SettingOutlined />} style={{ "fontSize": "25px", "fontFamily": "serif" }}>配置个性表单</Menu.Item>
          <Menu.SubMenu key="list" title="自定义表单列表" disabled={!modelListEntries.length} icon={<ProfileOutlined />} style={{ "fontSize": "25px", "fontFamily": "serif" }}>
            {
              modelListEntries.map(([modelName, schemaModel]) =>
                <Menu.Item key={modelName} onClick={() => setSelectedModel(schemaModel)}>{modelName}</Menu.Item>
              )
            }
          </Menu.SubMenu>
        </Menu>
      </div>
      <div className="content-area">{content}</div>
    </div>
  )
}

