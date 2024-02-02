import {
    App,
    Modal,
    Notice,
    Plugin,
    PluginSettingTab,
    Setting
} from 'obsidian';

import { MyView, VIEW_TYPE } from './view'

// 接口和类
interface MyPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
    mySetting: 'default'
}

// 插件类
export default class MyPlugin extends Plugin {
    settings: MyPluginSettings;

    // 加载时运行
    async onload() {
        console.log("plugin loading");
        await this.loadSettings();

        this.registerView(
            VIEW_TYPE,
            (leaf) => new MyView(leaf)
        )

        // 这将在左侧功能区中创建一个图标。
        this.addRibbonIcon('dice', 'Open my view', (evt) => {
            this.activateView()
        })

    }

    // 卸载时运行
    onunload() {
        console.log("plugin unloading");
        this.app.workspace.detachLeavesOfType(VIEW_TYPE)
    }

    // 导入设置
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    // 保存设置
    async saveSettings() {
        await this.saveData(this.settings);
    }
    async activateView() {
        if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length === 0) {
            await this.app.workspace.getRightLeaf(false).setViewState({
                type: VIEW_TYPE,
                active: true,
            })
        }

        this.app.workspace.revealLeaf(
            this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]
        )
    }
}


