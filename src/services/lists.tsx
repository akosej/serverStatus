import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { useServerList } from "./hooks";
import { Card } from 'primereact/card';
import { Knob } from 'primereact/knob';
import { Carousel } from 'primereact/carousel';
import { Badge } from 'primereact/badge';
import { ProgressBar } from 'primereact/progressbar';
import { classNames } from "primereact/utils";
interface Container {
    type: string;
    name: string;
    ipaddress: string;
    ports: number[];
    cpus: string;
    memory: string;
    onboot: string;
    status: string;
}

interface Server {
    name: string;
    version: string;
    ipaddress: string;
    cpucores: string;
    memory: string;
    hdd: string;
    containers: Container[];
}

interface ServerList {
    server: Server[];
}

const ListServer = () => {
    const { serverList, isLoading } = useServerList();
    const [layout, setLayout] = useState('grid');


    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );
    const subTitle = (server: Server) => (
        <a href={`https://${server.ipaddress}:8006/`} target='_blank'>
            <div className="stats shadow">
                <div className="stat place-items-center">
                    <div className="stat-title"><i className="pi pi-server"></i></div>
                    <div className="stat-value text-secondary">{server.name}</div>
                    <div className="stat-desc text-secondary">{server.version}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title"><i className="pi pi-sitemap"></i> {server.ipaddress}</div>
                    <div className="stat-title">cpu: {server.cpucores}  ram: {server.memory}</div>
                    <div className="stat-desc"><i className="pi pi-database"></i> {server.hdd}</div>
                    <div className="stat-value">{server.containers.length} <i className="pi pi-box"></i></div>
                </div>
            </div>
        </a>
    );
    const valueTemplate = (value: string) => {
        return (
            <React.Fragment>
                {Math.round(parseFloat(value))}/<b>100</b>
            </React.Fragment>
        );
    };
    return (
        <div className="flex rounded-box place-items-center">
            {serverList?.server.map((server: Server) => (
                <div className="flex w-full">
                    <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                        <Card title={server.name} subTitle={subTitle(server)} className="w-full">
                            <div className='w-full m-0 p-0'>
                                {server.containers.map((container: Container) => (

                                    <div className="card  w-full indicator mb-4">
                                        <span className={classNames(
                                            "indicator-item  indicator-center badge ",
                                            container.onboot === "0" ? "badge-warning" : "badge-success",
                                        )}><i className='pi pi-box mr-2'></i>{container.type} - {container.status}</span>
                                        <div className="grid w-full h-48 bg-base-300 text-left bg-gray-200 rounded">
                                            <div className="stats shadow bg-gray-200">

                                                <div className="stat">
                                                    <div className="stat-title">{container.ipaddress}</div>
                                                    <div className="stat-value">{container.name.replace(".uho.edu.cu", "")}</div>
                                                    <div className="stat-desc">{container.ports.map((port) => (
                                                        <Tag severity={port === 22 ? "danger" : port === 80 ? "success" : "warning"} value={port} rounded></Tag>
                                                    ))}</div>
                                                    <div className="stat-desc">cpu: {container.cpus} - ram: {container.memory}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </Card>
                    </div>
                    <div className="divider divider-horizontal"></div>

                </div>

            ))}
            {/* <DataView value={serverList?.server} itemTemplate={itemTemplate} layout="grid" header={header()} /> */}
        </div>
    );
}

export { ListServer };
