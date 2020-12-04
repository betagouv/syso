import { EvaluatedNode } from './AST/types'
import { Leaf } from './components/mecanisms/common'
import { InternalError } from './error'
import { registerEvaluationFunction } from './evaluationFunctions'
import { Context } from './parsePublicodes'
import { RuleNode } from './rule'

export type ReferenceNode = {
	nodeKind: 'reference'
	name: string
	explanation?: RuleNode & EvaluatedNode
	contextDottedName: string
	dottedName?: string
	jsx: any
}

export default function parseReference(
	v: string,
	context: Context
): ReferenceNode {
	return {
		nodeKind: 'reference',
		jsx: Leaf,
		name: v,
		contextDottedName: context.dottedName,
	}
}

registerEvaluationFunction('reference', function evaluateReference(node) {
	if (!node.dottedName) {
		throw new InternalError(node)
	}
	const explanation = this.evaluateNode(this.parsedRules[node.dottedName])
	return {
		...node,
		explanation,
		missingVariables: explanation.missingVariables,
		nodeValue: explanation.nodeValue,
		...('unit' in explanation && { unit: explanation.unit }),
	}
})