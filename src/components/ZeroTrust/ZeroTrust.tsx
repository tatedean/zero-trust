import { Button } from 'primereact/button';
import './ZeroTrust.css'
import ztd from './sampleData.json';
import { ProgressBar } from 'primereact/progressbar';
import { useEffect, useReducer, useRef, useState } from 'react';
import { GetZeroTrustFilesAll, ZT } from './ZeroTrustData';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FaInfoCircle } from 'react-icons/fa';
import { FiMousePointer } from 'react-icons/fi';
import { BiNetworkChart } from 'react-icons/bi';
import { BsShieldPlus } from 'react-icons/bs';
import ZeroTrustReducer, { emptyZTReducer } from './ZeroTrustReducer';
import { Dialog } from 'primereact/dialog';
import { get } from 'http';

 

const pillars:any = [
    {'id' : '1', 'name' : 'User', 'color': '#E8F5D5'},
    {'id' : '2', 'name' : 'Device', 'color': '#D2E9F8'},
    {'id' : '3', 'name' : 'Application & Workload', 'color': '#F8ECB4'},
    {'id' : '4', 'name' : 'Data', 'color': '#D0CECE'},
    {'id' : '5', 'name' : 'Network & Environment', 'color': '#FBD7AF'},
    {'id' : '6', 'name' : 'Automation & Orchestration', 'color': '#CCD6EA'},
    {'id' : '7', 'name' : 'Visibility & Analytics', 'color': '#E1D4FD'},
]

function getRandomNumber() {
    return Math.floor(Math.random() * 101); // Generates a random integer between 0 and 100 (inclusive)
  }

function PhaseElement(props:any){
    const phaseId = props.phase;
    const ctrs = ZT.phaseOrder[phaseId].filter((ctr:String) => ctr[0] === props.p);
    const rns = useRef<any>({});

    function cacheRn(ctr:any) {
        if(!rns.current?.[ctr]) rns.current[ctr] = getRandomNumber();
        return rns.current[ctr]
    }
    
    return(
        <div className={`col-2 ztp-${phaseId}`}>
            {ctrs.map((ctr:any) => {

                return(
                    <div key={`zt-${ctr}`} className='zt-card' style={{width: '100px'}}> 
                        <Button className='zt-btn' size='small' label={ctr} outlined style={{width: '100%'}} onClick={() => props.dispatch({type: 'setPopup', payload: ctr})}/>
                        <ProgressBar className='zt-prgb' value={cacheRn(ctr)} showValue={false} color='green'/>
                    </div>
                )
            })}
        </div>
    )
}

function PillarElement(props:any){
    const rns = useRef<any>({});

    function cacheRn(ctr:any) {
        if(!rns.current?.[ctr]) rns.current[ctr] = getRandomNumber();
        return rns.current[ctr]
    }
    const p = pillars.find((obj:any) => obj.id === props.pdata.id)
    return(
        <div className='pillar-container' style={{backgroundColor: p.color}}>
            <div className='col-2 flex d-flex flex-column' style={{justifyContent: 'center', alignItems: 'center'}}>
                <h5>{props.pdata.name}</h5>
                <ProgressBar value={cacheRn(props.pdata.id)} color='green' style={{width: '100%'}}/>
            </div>
            {props.actions.phases.map((phase:any) => {
                return(
                    <PhaseElement key={`phase-${phase}`} p={props.pdata.id} phase={phase} dispatch={props.dispatch}/>
                )
            })}
        </div>
    )
}

function ZeroTrustContent(props:any){
    return(
        <div className='container-zero-trust-content'>
            <div className='flex d-flex' style={{textAlign: 'start'}}>
                <div className='col-2'></div>
                {props.actions.phases.map((phase:any) => {
                    let phaseName = 'Phase ' + phase;
                    if(phase === 0) phaseName = 'Discovery';
                    return(
                        <div className='col-2'>
                            <h5>{phaseName}</h5>
                        </div>
                    )
                })}
            </div>
            <div className='container-zero-trust-content-body'>
                {props.actions.pillars.map((p:any) => {
                    return(
                        <PillarElement pdata={ZT.pillars[p]} actions={props.actions} dispatch={props.dispatch}/>
                    )
                })}
            </div>
        </div>
    )
}

const _phases = [0,1,2,3,4];

const popupHeader = (
    <>
    </>
)

export default function ZeroTrust(props:any){
    const [loading, setLoading] = useState(true);
    const [ztA, ztDispatch] = useReducer(ZeroTrustReducer, emptyZTReducer);

    useEffect(() => {
        GetZeroTrustFilesAll().then(() => {
            ztDispatch({type: 'init', payload: {
                phases : _phases,
                pillars : Object.keys(ZT.pillars),
            }});
            setLoading(false);
            // console.log(ZT);
        });
    }, []);

    if(loading){
        return(
            <>Loading...</>
        )
    }

    return(
        <div className="container-zero-trust">
            <div className="navbar-dark bg-dark sidebar-item">
                <div className='sidebar-option flex d-flex flex-row align-items-center p-1 justify-content-between m-0'>
                    <FaInfoCircle className='sidebar-icons info'/>
                </div>
                <div className='sidebar-option flex d-flex flex-row align-items-center p-1 justify-content-between' >
                    <FiMousePointer className='sidebar-icons'/>
                </div>
                <hr style={{marginBottom:'0'}}/>
            
                <div className='sidebar-option flex d-flex flex-row align-items-center p-1 justify-content-between'>
                <BiNetworkChart className={'sidebar-icons '} 
                                onClick={() => console.log(0)}/>
                </div>
                <div className='sidebar-option flex d-flex flex-row align-items-center p-1 justify-content-between'>
                <BsShieldPlus className={'sidebar-icons '} 
                            onClick={() => console.log(0)}/>
                </div>
            </div>
            <ZeroTrustContent actions={ztA} dispatch={ztDispatch}/>
            <Dialog header={popupHeader} visible={ztA.showPopup}
                    style={{ width: '75vw', height: 'auto' }}
                    onHide={() => ztDispatch({type: 'closePopup'})}
                    modal={false}
                    className=''>
                <div className='container'>
                    <div className='flex d-flex flex-column' style={{gap: '1rem'}}>
                        <div>
                            <strong>ZT Code:</strong> {ztA.selectedCtr}
                        </div>
                        <div>
                            <strong>Name:</strong> {ZT.controls[`zt-${ztA.selectedCtr}`].name}
                        </div>
                        <div>
                            <strong>Phase:</strong> {ZT.controls[`zt-${ztA.selectedCtr}`].phase} [{ZT.controls[`zt-${ztA.selectedCtr}`].m}/months]
                        </div>
                        <div>
                            <strong>Description:</strong> {ZT.controls[`zt-${ztA.selectedCtr}`].description}
                        </div>
                        <div className='flex d-flex flex-rows' style={{alignItems: 'center', gap: '1rem'}}>
                            <strong>Predecessor(s):</strong> 
                            {ZT.controls[`zt-${ztA.selectedCtr}`].predecessor.map((pred:any) => {
                                return(
                                    <Button className='zt-btn' size='small' label={pred} outlined onClick={() => ztDispatch({type: 'setPopup', payload: pred})}/>
                                )
                            })}
                        </div>
                        <div className='flex d-flex flex-rows' style={{alignItems: 'center', gap: '1rem'}}>
                            <strong>Successor(s):</strong> 
                            {ZT.controls[`zt-${ztA.selectedCtr}`].successor.map((succ:any) => {
                                return(
                                    <Button className='zt-btn' size='small' label={succ} outlined onClick={() => ztDispatch({type: 'setPopup', payload: succ})}/>
                                )
                            })}
                        </div>
                        <div>
                            <strong>Expected Outcomes:</strong>
                            {ZT.controls[`zt-${ztA.selectedCtr}`].outcomes.map((outcome:String, i:number) => {
                                return(
                                    <div>{String(i + 1)}. {outcome}</div>
                                )
                            })}
                        </div>
                        <div>
                            <strong>NIST 800-53 Control Mappings: </strong>
                            {' ' + ZT.ztmap[`${ztA.selectedCtr}`].join(', ')}
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
        
    )
}