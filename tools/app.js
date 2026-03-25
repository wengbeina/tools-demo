
const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const currentTool = ref(null);
    const codeInput = ref('');
    const formattedCode = ref('');
    const commandType = ref('git');
    const generatedCommand = ref('');
    const tableName = ref('');
    const columns = ref('');
    const sqlQuery = ref('');

    const toolTitle = computed(() => {
      switch(currentTool.value) {
        case 'code-formatter': return '代码格式化工具';
        case 'command-generator': return '命令生成器';
        case 'sql-builder': return 'SQL 查询构建器';
        default: return '';
      }
    });

    const openTool = (toolName) => {
      currentTool.value = toolName;
      // 重置表单数据
      codeInput.value = '';
      formattedCode.value = '';
      commandType.value = 'git';
      generatedCommand.value = '';
      tableName.value = '';
      columns.value = '';
      sqlQuery.value = '';
    };

    const closeTool = () => {
      currentTool.value = null;
    };

    const formatCode = () => {
      if (!codeInput.value.trim()) {
        alert("请输入代码内容");
        return;
      }
      // 模拟格式化
      formattedCode.value = codeInput.value.split('\n').map(line => '  ' + line).join('\n');
    };

    const generateCommand = () => {
      let cmd = '';
      switch(commandType.value) {
        case 'git':
          cmd = 'git add .\ngit commit -m "update"\ngit push origin main';
          break;
        case 'docker':
          cmd = 'docker build -t myapp .\ndocker run -p 8080:8080 myapp';
          break;
        case 'npm':
          cmd = 'npm install\nnpm start';
          break;
      }
      generatedCommand.value = cmd;
    };

    const buildSQL = () => {
      if (!tableName.value || !columns.value) {
        alert("请填写表名和列名");
        return;
      }
      sqlQuery.value = `SELECT ${columns.value} FROM ${tableName.value};`;
    };

    return {
      currentTool,
      codeInput,
      formattedCode,
      commandType,
      generatedCommand,
      tableName,
      columns,
      sqlQuery,
      toolTitle,
      openTool,
      closeTool,
      formatCode,
      generateCommand,
      buildSQL
    };
  }
}).mount('#app');
