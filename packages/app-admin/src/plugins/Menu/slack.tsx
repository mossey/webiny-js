import React from "react";
import { AdminDrawerFooterMenuPlugin } from "@webiny/app-admin/types";
import { ListItem, ListItemGraphic } from "@webiny/ui/List";
import { Icon } from "@webiny/ui/Icon";
import { ReactComponent as SlackIcon } from "@webiny/app-admin/assets/icons/slack-logo.svg";

import { i18n } from "@webiny/app/i18n";
const t = i18n.ns("app-admin/navigation");

const plugin: AdminDrawerFooterMenuPlugin = {
    type: "admin-drawer-footer-menu",
    name: "admin-drawer-footer-menu-slack",
    render() {
        return (
            <>
                <a href="https://www.webiny.com/slack/" rel="noopener noreferrer" target="_blank">
                    <ListItem ripple={false}>
                        <ListItemGraphic>
                            <Icon icon={<SlackIcon />} />
                        </ListItemGraphic>
                        {t`Slack`}
                    </ListItem>
                </a>
            </>
        );
    }
};

export default plugin;
