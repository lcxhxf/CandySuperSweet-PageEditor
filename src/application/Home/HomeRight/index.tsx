import React, { useMemo } from 'react'
import { Divider } from 'antd'
import { TSchema } from '../../../type/interface'
import { ConfigProp } from '../../../components/configComponents/ConfigProp'
import { ConfigInputProp } from '../../../components/configComponents/ConfigInputProps'
import { ConfigStyle } from '../../../components/configComponents/ConfigStyle'


export function LeggoRight(props: React.PropsWithoutRef<{
  activeSchema: React.MutableRefObject<TSchema>,
  schemaList: TSchema[],
  forceRender: () => void,
}>) {
  const { activeSchema, schemaList, forceRender }= props
  const { id, configs }= activeSchema.current || {}
  const { itemProps, inputProps, extra }= configs || {}
  const itemPropsEntries= useMemo(() => Object.entries(itemProps || {}), [activeSchema.current])
  const inputPropsEntries= useMemo(() => Object.entries(inputProps || {}), [activeSchema.current])
  const extraEntries = useMemo(() => Object.entries(extra || {}), [activeSchema.current])
  const schemaListOptions= [{label: '公共状态 - publicStates', value: 'publicStates'}].concat(schemaList.map(schema => {
    const { label, name }= schema.configs.itemProps
    return {
      label: `${label} - ${String(name)}`,
      value: String(name),
    }
  }))

  return (
    <div className="leggo-configs-right">
      <div className="top-area">
      <div style={{"color":"#5DADF7" ,"fontSize":"25px","textAlign":"center","fontWeight":"bold"}}>属性设置</div>
      </div>
      <div className="scroll-container">
        <div className="configs-area">
          <Divider>ItemProps</Divider>
          {
            itemPropsEntries.map(([propName, value]) => 
              <ConfigProp key={id + propName} 
                propOwner={itemProps} 
                namepath={['itemProps', propName]}
                propName={propName}
                propDefaultValue={value}
                activeSchema={activeSchema}
                schemaListOptions={schemaListOptions}
                forceRender={forceRender}
              />
            )
          }
        </div>
        <div className="configs-area">
          <Divider>InputProps</Divider>
          {
            activeSchema.current && <ConfigStyle key={id} activeSchema={activeSchema} forceRender={forceRender} />
          }
          {
            inputPropsEntries.map(([propName, value]) => 
              <ConfigInputProp key={id + propName} 
                propOwner={inputProps} 
                namepath={['inputProps', propName]}
                propName={propName}
                propDefaultValue={value}
                activeSchema={activeSchema}
                schemaListOptions={schemaListOptions}
                forceRender={forceRender}
              />
            )
          }
        </div>
        <div className="configs-area">
          <Divider>Extra</Divider>
          {
            extraEntries.map(([propName, value]) => 
              <ConfigProp key={id + propName} 
                propOwner={extra} 
                namepath={['extra', propName]}
                propName={propName}
                propDefaultValue={value}
                activeSchema={activeSchema}
                schemaListOptions={schemaListOptions}
                forceRender={forceRender}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}


