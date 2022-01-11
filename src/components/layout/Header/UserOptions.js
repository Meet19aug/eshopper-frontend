import React, { Fragment, useState } from 'react'
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

const UserOptions = ({ user }) => {

    const [open, setOpen] = useState(false);
    return (
        <Fragment>
            {console.log(user.avatar.url)}
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis molestias accusamus nulla, dolorum labore recusandae obcaecati quidem atque deleniti ea blanditiis ex, optio corrupti similique quam itaque. Nisi cupiditate eos ea in voluptate minus adipisci illo dolore corrupti, veniam error, facere a, minima placeat atque quasi natus! Delectus incidunt, eum, voluptatum explicabo suscipit eius quos sunt eos omnis voluptas fuga, rem ad odit! Consectetur ullam unde et velit incidunt maiores in repellendus quidem harum quaerat omnis nostrum nulla qui voluptatibus, laboriosam magnam eaque soluta dolor! Voluptatem, quaerat animi. Asperiores saepe velit nihil hic unde. Earum laudantium autem necessitatibus odit, incidunt iste odio officia rerum, fugiat consequuntur fugit perspiciatis sit delectus natus quo nam nihil numquam, et alias quisquam! Tenetur, sapiente. Molestiae consequuntur porro corrupti ad quibusdam, eos qui at cum est. Nostrum, vero sed. Alias saepe quia soluta illum nisi deleniti id iusto impedit animi ullam sed, molestias rem non quod fugit aut ut minus at modi aliquam dignissimos repellat earum totam expedita. Optio consectetur mollitia, facilis sunt, perspiciatis accusantium corporis sapiente commodi laudantium magnam quaerat ipsam veniam, quam eum! Natus voluptatum harum consequatur, quibusdam ullam rerum odit asperiores quaerat earum similique voluptates cum, facere voluptatem necessitatibus rem aut illum fugit vero laborum temporibus commodi. Laboriosam maxime voluptatum molestiae id blanditiis earum tenetur, consequatur aut quo nobis mollitia, necessitatibus, at alias et! Beatae iusto repellat voluptatum doloremque laborum. Tempore, nemo explicabo incidunt voluptates eius fuga adipisci, nobis error fugit molestias laboriosam. Dolor veritatis magni assumenda iure minima ullam ea mollitia tempore eaque explicabo eius, facilis nam itaque consequatur placeat doloribus soluta, nisi voluptates! Eaque, sint deserunt dolorum, possimus corrupti laudantium beatae minima animi labore vel tenetur aliquid magni consequatur dolore, placeat eum optio laboriosam autem vitae dignissimos. Dignissimos, voluptas hic ipsam a facilis doloribus reiciendis fugiat debitis, eaque exercitationem magni.</p> */}
            {/* <p>{user.avatar.url}</p> */}
            <SpeedDial
            className="speedDial"
                ariaLabel='SpeedDial tooltip example'
                onClose={()=> setOpen(false)}
                onOpen={()=> setOpen(true)}
                open={open}
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    alt="Profile"
                />}
                
            >
            </SpeedDial>

        </Fragment>
    )
}

export default UserOptions
