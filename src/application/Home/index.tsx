import React, { useRef, useState } from 'react'
import { TItemStore, TOnGetSchemaModel, TSchema } from '../../type/interface'
import { LeggoLeft } from './HomeLeft';
import { LeggoRight } from './HomeRight'
import { LeggoMiddle } from './HomeMiddle'
import { leggoItemStore } from '../../api/config';


export function LeggoConfigs(props: React.PropsWithChildren<{ onGetSchemaModel: TOnGetSchemaModel }>) {
  const activeSchema= useRef<TSchema>(null)
  const [schemaList, setSchemaList]= useState<TSchema[]>([])
  const [ , setForceRender]= useState(0)
  const forceRender= () => setForceRender(pre => pre+1)

  return (
    <div className="leggo-configs">
      <LeggoLeft />
      <LeggoMiddle 
        schemaList={schemaList} 
        setSchemaList={setSchemaList} 
        activeSchema={activeSchema} 
        forceRender={forceRender} 
        onGetSchemaModel={props.onGetSchemaModel} 
      />
      <LeggoRight 
        schemaList={schemaList} 
        activeSchema={activeSchema} 
        forceRender={forceRender} 
      />
    </div>
  )
}
