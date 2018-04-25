Nasoft.TopButton.toolPictureBase={
		init:function(){
			var tabs=$('#stepTabs').tabs('tabs');
			if(tabs && tabs.length>1){
				$.buttonEnable(['save_file_pictrue','save_as_file_pictrue']);//启用此列表中的按钮
			}else{
				$.buttonDisable(['save_file_pictrue','save_as_file_pictrue']);//禁用此列表中的按钮
			}
			
			$('#new_file_pictrue').unbind("click").click(function(){
				Nasoft.Window.createProject.windowOpen();
			});
			
			$('#save_file_pictrue').unbind("click").click(function(){//保存
				saveProject();
			});
			//另存为
			$('#save_as_file_pictrue').unbind("click").click(function(){
				Nasoft.TopButton.File.save_as();
			})
			
			$('#open_file_pictrue').unbind("click").click(function(){
				$('#open_project_win').window("open");
			});
	 },
}