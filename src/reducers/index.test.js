import cloudreveApp, { initState } from './index'
import { setModalsLoading, openLoadingDialog, openGetSourceDialog,
  openShareDialog, openMoveDialog, navigateUp, navigateTo,
  drawerToggleAction, changeViewMethod, changeSortMethod,
  changeContextMenu, dragAndDrop, setNavigatorLoadingStatus,
  setNavigatorError, updateFileList, addSelectedTargets,
  setSelectedTarget, removeSelectedTargets, toggleDaylightMode,
  applyThemes, openCreateFolderDialog, openRenameDialog,
  openRemoveDialog, openResaveDialog, setUserPopover,
  setShareUserPopover, setSiteConfig, openMusicDialog,
  openRemoteDownloadDialog, openTorrentDownloadDialog,
  openDecompressDialog, openCompressDialog, openCopyDialog,
  closeAllModals, changeSubTitle, toggleSnackbar, setSessionStatus,
  enableLoadUploader, refreshFileList, searchMyFile, showImgPreivew, refreshStorage, saveFile, setLastSelect, setShiftSelectedIds
} from '../actions/index'

describe('index reducer', () => {
  it('should return the initial state', () => {
    expect(cloudreveApp(undefined, {})).toEqual(initState)
  })

  it('should handle DRAWER_TOGGLE', () => {
    const openAction = drawerToggleAction(true)
    expect(cloudreveApp(initState, openAction)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        open: true,
      }
    })

    const clossAction = drawerToggleAction(false)
    expect(cloudreveApp(initState, clossAction)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        open: false,
      }
    })
  })

  it('should handle CHANGE_VIEW_METHOD', () => {
    const action = changeViewMethod('list')
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        explorerViewMethod: 'list',
      }
    })
  })

  describe('CHANGE_SORT_METHOD', () => {
    const explorerState = {
      fileList: [{
        type: 'file',
        name: 'b',
        size: 10,
        date: "2020/04/30"
      }, {
        type: 'file',
        name: 'a',
        size: 11,
        date: "2020/05/01"
      }, {
        type: 'file',
        name: 'z',
        size: 110,
        date: "2020/04/29"
      }],
      dirList: [{
        type: 'dir',
        name: 'b_dir',
        size: 10,
        date: "2020/04/30"
      }, {
        type: 'dir',
        name: 'a_dir',
        size: 11,
        date: "2020/05/01"
      }, {
        type: 'dir',
        name: 'z_dir',
        size: 110,
        date: "2020/04/29"
      }],
    }
    it('should handle sizePos', () => {
      const action = changeSortMethod('sizePos')
      const sortFunc = (a, b) => {
        return a.size-b.size
      }
      const expectState = {
        fileList: explorerState.fileList.sort(sortFunc),
        dirList: explorerState.dirList.sort(sortFunc),
      }
      expect(cloudreveApp({
        ...initState,
        explorer: {
          ...initState.explorer,
          ...explorerState,
        },
      }, action)).toEqual({
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'sizePos',
        },
        explorer: {
          ...initState.explorer,
          fileList: expectState.fileList,
          dirList: expectState.dirList,
        }
      })
    })

    it('should handle sizeRes', () => {
      const action = changeSortMethod('sizeRes')
      const sortFunc = (a, b) => {
        return b.size-a.size
      }
      const expectState = {
        fileList: explorerState.fileList.sort(sortFunc),
        dirList: explorerState.dirList.sort(sortFunc),
      }
      expect(cloudreveApp({
        ...initState,
        explorer: {
          ...initState.explorer,
          ...explorerState,
        },
      }, action)).toEqual({
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'sizeRes',
        },
        explorer: {
          ...initState.explorer,
          fileList: expectState.fileList,
          dirList: expectState.dirList,
        }
      })
    })

    it('should handle namePos', () => {
      const action = changeSortMethod('namePos')
      const sortFunc = (a, b) => {
        return a.name.localeCompare(b.name)
      }
      const expectState = {
        fileList: explorerState.fileList.sort(sortFunc),
        dirList: explorerState.dirList.sort(sortFunc),
      }
      expect(cloudreveApp({
        ...initState,
        explorer: {
          ...initState.explorer,
          ...explorerState,
        },
      }, action)).toEqual({
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'namePos',
        },
        explorer: {
          ...initState.explorer,
          fileList: expectState.fileList,
          dirList: expectState.dirList,
        }
      })
    })

    it('should handle nameRev', () => {
      const action = changeSortMethod('nameRev')
      const sortFunc = (a, b) => {
        return b.name.localeCompare(a.name)
      }
      const expectState = {
        fileList: explorerState.fileList.sort(sortFunc),
        dirList: explorerState.dirList.sort(sortFunc),
      }
      expect(cloudreveApp({
        ...initState,
        explorer: {
          ...initState.explorer,
          ...explorerState,
        },
      }, action)).toEqual({
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'nameRev',
        },
        explorer: {
          ...initState.explorer,
          fileList: expectState.fileList,
          dirList: expectState.dirList,
        }
      })
    })

    it('should handle timePos', () => {
      const action = changeSortMethod('timePos')
      const sortFunc = (a, b) => {
        return Date.parse(a.date)-Date.parse(b.date)
      }
      const expectState = {
        fileList: explorerState.fileList.sort(sortFunc),
        dirList: explorerState.dirList.sort(sortFunc),
      }
      expect(cloudreveApp({
        ...initState,
        explorer: {
          ...initState.explorer,
          ...explorerState,
        },
      }, action)).toEqual({
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'timePos',
        },
        explorer: {
          ...initState.explorer,
          fileList: expectState.fileList,
          dirList: expectState.dirList,
        }
      })
    })

    it('should handle timeRev', () => {
      const action = changeSortMethod('timeRev')
      const sortFunc = (a, b) => {
        return Date.parse(b.date)-Date.parse(a.date)
      }
      const expectState = {
        fileList: explorerState.fileList.sort(sortFunc),
        dirList: explorerState.dirList.sort(sortFunc),
      }
      expect(cloudreveApp({
        ...initState,
        explorer: {
          ...initState.explorer,
          ...explorerState,
        },
      }, action)).toEqual({
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'timeRev',
        },
        explorer: {
          ...initState.explorer,
          fileList: expectState.fileList,
          dirList: expectState.dirList,
        }
      })
    })
  })

  it('should handle CHANGE_CONTEXT_MENU', () => {
    const action1 = changeContextMenu('empty', false)
    expect(cloudreveApp(initState, action1)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        contextOpen: false,
        contextType: 'empty'
      }
    })
    const action2 = changeContextMenu('aa', true)
    expect(cloudreveApp(initState, action2)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        contextOpen: true,
        contextType: 'aa'
      }
    })
  })

  it('should handle DRAG_AND_DROP', () => {
    const action = dragAndDrop('source', 'target')
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      explorer: {
        ...initState.explorer,
        dndSignal: true,
        dndTarget: 'target',
        dndSource: 'source'
      }
    })
  })

  it('should handle SET_NAVIGATOR_LOADING_STATUE', () => {
    const action = setNavigatorLoadingStatus(true)
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        navigatorLoading: true
      }
    })
  })

  it('should handle SET_NAVIGATOR_ERROR', () => {
    const action = setNavigatorError(true, 'Error Message')
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        navigatorError: true,
        navigatorErrorMsg: 'Error Message'
      }
    })
  })

  describe('UPDATE_FILE_LIST', () => {
    const fileList = [{
        type: 'file',
        name: 'b',
        size: 10,
        date: "2020/04/30"
      }, {
        type: 'file',
        name: 'a',
        size: 11,
        date: "2020/05/01"
      }, {
        type: 'file',
        name: 'z',
        size: 110,
        date: "2020/04/29"
      }]
    const dirList = [{
        type: 'dir',
        name: 'b_dir',
        size: 10,
        date: "2020/04/30"
      }, {
        type: 'dir',
        name: 'a_dir',
        size: 11,
        date: "2020/05/01"
      }, {
        type: 'dir',
        name: 'z_dir',
        size: 110,
        date: "2020/04/29"
      }]
    const fileAction = updateFileList(fileList)
    const dirAction = updateFileList(dirList)
    it('should handle sizePos', () => {
      const sortFun = (a, b) => {
        return a.size-b.size
      }
      const state = {
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'sizePos'
        }
      }
      expect(cloudreveApp(state, fileAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          fileList: fileList.sort(sortFun),
        }
      })
      expect(cloudreveApp(state, dirAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          dirList: dirList.sort(sortFun),
        }
      })
    })

    it('should handle sizeRes', () => {
      const sortFun = (a, b) => {
        return b.size-a.size
      }
      const state = {
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'sizeRes'
        }
      }
      expect(cloudreveApp(state, fileAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          fileList: fileList.sort(sortFun),
        }
      })
      expect(cloudreveApp(state, dirAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          dirList: dirList.sort(sortFun),
        }
      })
    })

    it('should handle namePos', () => {
      const sortFun = (a, b) => {
        return a.name.localeCompare(b.name)
      }
      const state = {
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'namePos'
        }
      }
      expect(cloudreveApp(state, fileAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          fileList: fileList.sort(sortFun),
        }
      })
      expect(cloudreveApp(state, dirAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          dirList: dirList.sort(sortFun),
        }
      })
    })

    it('should handle nameRev', () => {
      const sortFun = (a, b) => {
        return b.name.localeCompare(a.name)
      }
      const state = {
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'nameRev'
        }
      }
      expect(cloudreveApp(state, fileAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          fileList: fileList.sort(sortFun),
        }
      })
      expect(cloudreveApp(state, dirAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          dirList: dirList.sort(sortFun),
        }
      })
    })

    it('should handle timePos', () => {
      const sortFun = (a, b) => {
        return Date.parse(a.date)-Date.parse(b.date)
      }
      const state = {
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'timePos'
        }
      }
      expect(cloudreveApp(state, fileAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          fileList: fileList.sort(sortFun),
        }
      })
      expect(cloudreveApp(state, dirAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          dirList: dirList.sort(sortFun),
        }
      })
    })

    it('should handle timeRev', () => {
      const sortFun = (a, b) => {
        return Date.parse(b.date)-Date.parse(a.date)
      }
      const state = {
        ...initState,
        viewUpdate: {
          ...initState.viewUpdate,
          sortMethod: 'timeRev'
        }
      }
      expect(cloudreveApp(state, fileAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          fileList: fileList.sort(sortFun),
        }
      })
      expect(cloudreveApp(state, dirAction)).toEqual({
        ...state,
        explorer: {
          ...initState.explorer,
          dirList: dirList.sort(sortFun),
        }
      })
    })
  })

  it('should handle ADD_SELECTED_TARGETS', () => {
    const newSelect = [{
      type: 'file',
    }, {
      type: 'dir'
    }]
    const action = addSelectedTargets(newSelect)
    expect(cloudreveApp({
      ...initState,
      explorer: {
        ...initState.explorer,
        selected: [{ type: 'file' }]
      }
    }, action)).toEqual({
      ...initState,
      explorer: {
        ...initState.explorer,
        selected: [{type: 'file'}, ...newSelect],
        selectProps: {
          isMultiple: true,
          withFolder: true,
          withFile: true
        }
      }
    })
  })

  it('should handle SET_SELECTED_TARGET', () => {
    const newSelect = [{
      type: 'file',
    }, {
      type: 'dir'
    }]
    const action = setSelectedTarget(newSelect)
    expect(cloudreveApp({
      ...initState,
      explorer: {
        ...initState.explorer,
        selected: [{ type: 'file' }]
      }
    }, action)).toEqual({
      ...initState,
      explorer: {
        ...initState.explorer,
        selected: newSelect,
        selectProps: {
          isMultiple: true,
          withFolder: true,
          withFile: true
        }
      }
    })
  })

  it('should handle RMOVE_SELECTED_TARGETS', () => {
    const remove = ['1']
    const action = removeSelectedTargets(remove)
    expect(cloudreveApp({
      ...initState,
      explorer: {
        ...initState.explorer,
        selected: [{ id: '1', type: 'file' }, { id: '2', type: 'file' }]
      }
    }, action)).toEqual({
      ...initState,
      explorer: {
        ...initState.explorer,
        selected: [{ id: '2', type: 'file' }],
        selectProps: {
          isMultiple: false,
          // TODO: use !! case to boolean
          withFolder: undefined,
          withFile: true
        }
      }
    })
  })

  it('should handle NAVIGATOR_TO', () => {
    const action = navigateTo('/somewhere')
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      navigator: {
        ...initState.navigator,
        path: '/somewhere'
      },
      viewUpdate: {
        ...initState.viewUpdate,
        contextOpen:false,
        navigatorError:false,
        navigatorLoading: true,
      },
      explorer: {
        ...initState.explorer,
        selected: [],
        selectProps: {
          isMultiple:false,
          withFolder:false,
          withFile:false,
        },
        keywords:null,
      }
    })
    expect(window.currntPath).toEqual('/somewhere')
  })

  it('should handle NAVIGATOR_UP', () => {
    const action = navigateUp('somewhere')
    const navState = {
      ...initState,
      navigator: {
        ...initState.navigator,
        path: '/to/somewhere'
      }
    }
    expect(cloudreveApp(navState, action)).toEqual({
      ...initState,
      navigator: {
        ...initState.navigator,
        path: '/to'
      },
      viewUpdate: {
        ...initState.viewUpdate,
        contextOpen:false,
        navigatorError:false,
        navigatorLoading: true,
      },
      explorer: {
        ...initState.explorer,
        selected: [],
        selectProps: {
          isMultiple:false,
          withFolder:false,
          withFile:false,
        },
        keywords:null,
      }
    })
    expect(window.currntPath).toEqual('/to')
  })
  
  it('should handle TOGGLE_DAYLIGHT_MODE', () => {
    const action = toggleDaylightMode()
    const darkState = {
      ...initState,
      siteConfig: {
        ...initState.siteConfig,
        theme:{
            ...initState.siteConfig.theme,
            palette:{
                ...initState.siteConfig.theme.palette,
                type:"dark",
            }
        },
      },
    }
    const lightState = {
      ...initState,
      siteConfig: {
        ...initState.siteConfig,
        theme:{
            ...initState.siteConfig.theme,
            palette:{
                ...initState.siteConfig.theme.palette,
                type:"light",
            }
        },
      },
    }
    expect(cloudreveApp(initState, action)).toEqual(darkState)
    expect(cloudreveApp(darkState, action)).toEqual(lightState)
  })

  it('should handle APPLY_THEME', () => {
    const action = applyThemes('foo')
    const stateWithThemes = {
      ...initState,
      siteConfig: {
        ...initState.siteConfig,
        themes: JSON.stringify({foo:'bar'}),
      },
    }
    expect(cloudreveApp(stateWithThemes, action)).toEqual({
      ...stateWithThemes,
      siteConfig: {
        ...stateWithThemes.siteConfig,
        theme: 'bar'
      }
    })


  })

  it('should handle OPEN_CREATE_FOLDER_DIALOG', () => {
    const action = openCreateFolderDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          createNewFolder: true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_RENAME_DIALOG', () => {
    const action = openRenameDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          rename: true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_REMOVE_DIALOG', () => {
    const action = openRemoveDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          remove:true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_MOVE_DIALOG', () => {
    const action = openMoveDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          move:true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_RESAVE_DIALOG', () => {
    const action = openResaveDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          resave:true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle SET_USER_POPOVER', () => {
    // TODO: update to real anchor
    const action = setUserPopover('anchor')
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        userPopoverAnchorEl: 'anchor',
      }
    })
  })

  it('should handle SET_SHARE_USER_POPOVER', () => {
    // TODO: update to real anchor
    const action = setShareUserPopover('anchor')
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        shareUserPopoverAnchorEl: 'anchor',
      }
    })
  })

  it('should handle OPEN_SHARE_DIALOG', () => {
    // TODO: update to real anchor
    const action = openShareDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          share: true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle SET_SITE_CONFIG', () => {
    // TODO: update to real anchor
    const action = setSiteConfig({foo: 'bar'})
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      siteConfig: {
        foo: 'bar'
      }
    })
  })

  it('should handle SET_SITE_CONFIG', () => {
    // TODO: update to real anchor
    const action = setSiteConfig({foo: 'bar'})
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      siteConfig: {
        foo: 'bar'
      }
    })
  })

  it('should handle OPEN_MUSIC_DIALOG', () => {
    const action = openMusicDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          music:true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_REMOTE_DOWNLOAD_DIALOG', () => {
    const action = openRemoteDownloadDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          remoteDownload:true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_TORRENT_DOWNLOAD_DIALOG', () => {
    const action = openTorrentDownloadDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          torrentDownload:true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_DECOMPRESS_DIALOG', () => {
    const action = openDecompressDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          decompress:true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_COMPRESS_DIALOG', () => {
    const action = openCompressDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          compress:true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_GET_SOURCE_DIALOG', () => {
    const action = openGetSourceDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          getSource:true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_COPY_DIALOG', () => {
    const action = openCopyDialog()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          copy:true,
        },
        contextOpen:false,
      }
    })
  })

  it('should handle OPEN_LOADING_DIALOG', () => {
    const action = openLoadingDialog('loading')
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          loading:true,
          loadingText: 'loading',
        },
        contextOpen:false,
      }
    })
  })

  it('should handle CLOSE_ALL_MODALS', () => {
    const action = closeAllModals()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modals: {
          ...initState.viewUpdate.modals,
          createNewFolder:false,
          rename:false,
          move:false,
          remove:false,
          share:false,
          music:false,
          remoteDownload:false,
          torrentDownload:false,
          getSource:false,
          resave:false,
          copy:false,
          loading:false,
          compress:false,
          decompress:false,
        },
      }
    })
  })

  it('should handle CHANGE_SUB_TITLE', () => {
    const action = changeSubTitle('test sub title')
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        subTitle: 'test sub title',
      }
    })
  })

  it('should handle TOGGLE_SNACKBAR', () => {
    const action = toggleSnackbar("top", "right", "something wrong", "error")
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        snackbar:{
          toggle: true,
          vertical: 'top',
          horizontal: 'right',
          msg: 'something wrong',
          color: 'error',
        },
      }
    })
  })

  it('should handle SET_MODALS_LOADING', () => {
    const action = setModalsLoading('test loading status')
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        modalsLoading: 'test loading status'
      }
    })
  })

  it('should handle SET_SESSION_STATUS', () => {
    const action = setSessionStatus(true)
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        isLogin: true
      }
    })
  })

  it('should handle ENABLE_LOAD_UPLOADER', () => {
    const action = enableLoadUploader()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        loadUploader: true
      }
    })
  })

  it('should handle REFRESH_FILE_LIST', () => {
    const action = refreshFileList()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      navigator: {
        ...initState.navigator,
        refresh: false,
      },
      explorer: {
        ...initState.explorer,
        selected:[],
        selectProps: {
            isMultiple:false,
            withFolder:false,
            withFile:false,
        }
      }
    })
  })

  it('should handle SEARCH_MY_FILE', () => {
    const action = searchMyFile('keyword')
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      navigator: {
        ...initState.navigator,
        path: "/搜索结果",
        refresh: true,
      },
      viewUpdate: {
        ...initState.viewUpdate,
        contextOpen:false,
        navigatorError:false,
        navigatorLoading:true,
      },
      explorer: {
        ...initState.explorer,
        selected:[],
        selectProps: {
            isMultiple:false,
            withFolder:false,
            withFile:false,
        },
        keywords: 'keyword'
      }
    })
  })


  it('should handle SHOW_IMG_PREIVEW', () => {
    const action = showImgPreivew({type: 'file'})
    const showImgState = {
      ...initState,
      explorer: {
        ...initState.explorer,
        fileList: [{type: 'file'}, {type: 'dir'}]
      }
    }
    expect(cloudreveApp(showImgState, action)).toEqual({
      ...showImgState,
      explorer: {
        ...showImgState.explorer,
        imgPreview: {
          ...showImgState.explorer.imgPreview,
          first: {type: 'file'},
          other: [{type: 'file'}, {type: 'dir'}],
        }
      },
    })
  })

  it('should handle REFRESH_STORAGE', () => {
    const action = refreshStorage()

    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      viewUpdate: {
        ...initState.viewUpdate,
        storageRefresh: true
      },
    })
  })

  it('should handle SAVE_FILE', () => {
    const action = saveFile()
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      explorer: {
        ...initState.explorer,
        fileSave: true
      },
    })
  })

  it('should handle SET_LAST_SELECT', () => {
    const action = setLastSelect({type: 'file'}, 1)
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      explorer: {
        ...initState.explorer,
        lastSelect: {
          file: {type: 'file'},
          index: 1,
        }
      },
    })
  })

  it('should handle SET_SHIFT_SELECTED_IDS', () => {
    const action = setShiftSelectedIds(['1', '2'])
    expect(cloudreveApp(initState, action)).toEqual({
      ...initState,
      explorer: {
        ...initState.explorer,
        shiftSelectedIds: ['1', '2']
      },
    })
  })
})
