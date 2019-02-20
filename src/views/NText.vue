<template>
	<div class="NText">
		<div class="source">
			<div class="sectionTitle">Source</div>
			<textarea v-model="sourceText"/>
		</div>
		<div class="pattern">
			<div class="sectionTitle">Pattern</div>
			<textarea v-model="patternText"/>
			<div class="parsingConfig">
				Column Separater
				<input v-model="columnSeparater">
				Row Separater
				<input v-model="rowSeparater">
			</div>
		</div>
		<div class="output">
			<div class="sectionTitle">Output</div>
			<textarea v-model="outputText"/>
		</div>
	</div>
</template>

<script>
export default {
	name: "NText",
	components: {},
	props: {},
	data() {
		return {
			sourceText: "",
			patternText: "",
			columnSeparater: ",",
			rowSeparater: "\\n"
		};
	},
	computed: {
		_rowSeparater: function() {
			return this.replaceNormalWithLiterals(this.rowSeparater);
		},
		_columnSeparater: function() {
			return this.replaceNormalWithLiterals(this.columnSeparater);
		},
		outputText() {
			let rows = this.sourceText.split(this._rowSeparater);

			var output = "";

			rows.forEach(row => {
				var s = row;
				let currentLine = this.patternText;
				let items = row.split(this._columnSeparater);

				//Current problem is that $10 gets replaced by $1 and becomes $1 + '0'
				//Could operate in reverse, going from highest index to lowest, but that may come with its own challenges.
				//And if someone wants dollar signs in their source text, that will get overriden as well.
				//Maybe find all of the indexes and cut them out then replace instead of a full replace all?
				items.reverse().forEach((item, index) => {
					currentLine = currentLine.replace(
						new RegExp(
							`\$${items.length - index}`.replace(
								/[.*+?^${}()|[\]\\]/g,
								"\\$&"
							),
							"g"
						),
						item
					);
				});
				output += currentLine + this._rowSeparater;
			});

			return output;
		}
	},
	methods: {
		replaceNormalWithLiterals(s) {
			return s.replace("\\n", "\n").replace("\\t", "\t");
		}
	}
};
</script>

<style scoped>
.NText {
	display: flex;
	flex-direction: column;
	justify-content: center;

	background-color: rgb(160, 100, 220);
	padding: 10px;
	border-radius: 10px;
}
.NText textarea {
	width: 98%;
	min-height: 200px;
	outline: none;
	border-radius: 10px;
	padding: 10px;

	font-size: 12pt;
}
.source {
}
.sectionTitle {
	font-size: 14pt;
	color: white;
	text-align: left;
	margin-left: 12px;
}
.pattern {
}
.parsingConfig {
	display: flex;
	color: white;
}
.parsingConfig input {
	margin-left: 8px;
	margin-right: 12px;
}
.output {
}
</style>